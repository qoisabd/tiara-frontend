"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import {
  fetchAllUser,
  deleteUserById,
  setActiveUser,
} from "@/features/admin/adminThunk";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Plus, UserRoundX, UserRoundCheck } from "lucide-react";
import UserCreateModal from "./UserCreateModal";
import { UserManagementHeader } from "./UserHeader";
import { RootState, AppDispatch } from "@/store/store";
import { RegisterType } from "@/types/types";
import { Bounce, toast } from "react-toastify";

const UserDataTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status } = useSelector(
    (state: RootState) => state.adminUserReducer
  );

  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<number | null>(null);
  const [editUser, setEditUser] = useState<RegisterType | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<RegisterType[]>([]);

  const refreshData = () => {
    dispatch(fetchAllUser());
  };

  useEffect(() => {
    refreshData();
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(
        (user) =>
          user.us_username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.us_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.us_phone_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const handleDelete = async () => {
    try {
      if (deleteUserId) {
        await dispatch(deleteUserById(deleteUserId)).unwrap();
        refreshData();
        setIsDeleteModalOpen(false);
        setDeleteUserId(null);
        toast.success("User has been disable successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error(`Failed to disable user: ${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleActiveUser = async () => {
    try {
      if (isActive) {
        await dispatch(setActiveUser(isActive)).unwrap();
        refreshData();
        setIsUpdateUserModalOpen(false);
        setDeleteUserId(null);
        toast.success("User has been enable successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error(`Failed to update status: ${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const columns = [
    {
      name: "No",
      cell: (row: RegisterType, index: number) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Username",
      selector: (row: RegisterType) => row.us_username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: RegisterType) => row.us_email,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row: RegisterType) => row.us_phone_number,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: RegisterType) => (row.us_is_active ? "Active" : "Inactive"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: RegisterType) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setEditUser(row);
              setIsCreateModalOpen(true);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          {row.us_is_active ? (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => {
                setDeleteUserId(row.us_id as number);
                setIsDeleteModalOpen(true);
              }}
            >
              <UserRoundX className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="default"
              size="icon"
              className="bg-green-600 hover:bg-green-500"
              onClick={() => {
                setIsActive(row.us_id as number);
                setIsUpdateUserModalOpen(true);
              }}
            >
              <UserRoundCheck className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <UserManagementHeader
        data={users}
        onSearch={(value) => setSearchTerm(value)}
      />

      <Button
        className="mb-4"
        onClick={() => {
          setEditUser(null);
          setIsCreateModalOpen(true);
        }}
      >
        <Plus className="mr-2 h-4 w-4" /> Create User
      </Button>

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        responsive
        className="border"
        progressPending={status === "LOADING"}
        progressComponent={<div>Loading...</div>}
      />

      <UserCreateModal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        initialData={editUser}
        onSuccess={refreshData}
      />

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disable User</DialogTitle>
            <DialogDescription>
              Are you sure you want to disable this user?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Disable
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isUpdateUserModalOpen}
        onOpenChange={setIsUpdateUserModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable User</DialogTitle>
            <DialogDescription>
              Are you sure you want to Enable this user?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsUpdateUserModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleActiveUser}
              className="bg-green-600 hover:bg-green-500"
            >
              Enable
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDataTable;
