"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import {
  fetchAllCategory,
  setInactiveCategory,
  setActiveCategory,
} from "@/features/admin/adminThunk";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Plus, SquareCheck } from "lucide-react";
import CategoriesCreateModal from "./CategoriesCreateModal";
import { RootState, AppDispatch } from "@/store/store";
import { CategoryType } from "@/types/types";
import { Bounce, toast } from "react-toastify";
import Image from "next/image";
import { CategoriesHeader } from "./CategoriesHeader";

const CategoryDataTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status } = useSelector(
    (state: RootState) => state.adminCategoryReducer
  );

  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState<CategoryType | null>(null);
  const [isActive, setIsActive] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<CategoryType[]>(
    []
  );

  const refreshData = () => {
    dispatch(fetchAllCategory());
  };

  useEffect(() => {
    refreshData();
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = categories.filter(
        (category) =>
          category.ct_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.ct_game_publisher
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);

  const handleInactiveCategory = async () => {
    try {
      if (deleteCategoryId) {
        await dispatch(setInactiveCategory(deleteCategoryId)).unwrap();
        refreshData();
        setIsDeleteModalOpen(false);
        setDeleteCategoryId(null);
        toast.success("Category Deleted Successfully", {
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
      toast.error(`Failed to delete category: ${error}`, {
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

  const handleActiveCategory = async () => {
    try {
      if (isActive) {
        await dispatch(setActiveCategory(isActive)).unwrap();
        refreshData();
        setIsUpdateCategoryModalOpen(false);
        setIsActive(null);
        toast.success("Category Activated Successfully", {
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
      toast.error(`Failed to active category: ${error}`, {
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
      cell: (_: CategoryType, index: number) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Category Name",
      selector: (row: CategoryType) => row.ct_name,
      sortable: true,
    },
    {
      name: "Code",
      selector: (row: CategoryType) => row.ct_code,
      sortable: true,
    },
    {
      name: "Game Publisher",
      selector: (row: CategoryType) => row.ct_game_publisher,
      sortable: true,
    },
    {
      name: "Currency Type",
      selector: (row: CategoryType) => row.ct_currency_type,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row: CategoryType) => (
        <div className="h-16 w-16 relative">
          <Image
            src={row.ct_image}
            alt={row.ct_name}
            fill
            className="object-cover rounded"
          />
        </div>
      ),
    },
    {
      name: "Status",
      cell: (row: CategoryType) => (row.ct_is_active ? "Active" : "Inactive"),
    },
    {
      name: "Actions",
      cell: (row: CategoryType) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setEditCategory(row);
              setIsCreateModalOpen(true);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          {row.ct_is_active ? (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => {
                setDeleteCategoryId(row.ct_id as number);
                setIsDeleteModalOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="default"
              size="icon"
              className="bg-green-600 hover:bg-green-500"
              onClick={() => {
                setIsActive(row.ct_id as number);
                setIsUpdateCategoryModalOpen(true);
              }}
            >
              <SquareCheck className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <CategoriesHeader onSearch={setSearchTerm} data={categories} />

      <Button
        className="mb-4"
        onClick={() => {
          setEditCategory(null);
          setIsCreateModalOpen(true);
        }}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Category
      </Button>

      <DataTable
        columns={columns}
        data={filteredCategories}
        noHeader
        pagination
        highlightOnHover
        pointerOnHover
        progressPending={status === "loading"}
        progressComponent={<div>Loading...</div>}
      />

      <CategoriesCreateModal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        initialData={editCategory}
        onSuccess={refreshData}
      />

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disable Category</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to disable this category?
          </DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleInactiveCategory} variant="destructive">
              Disable
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isUpdateCategoryModalOpen}
        onOpenChange={setIsUpdateCategoryModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Active Category</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to active this category?
          </DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsUpdateCategoryModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleActiveCategory}
              variant="default"
              className="bg-green-600 hover:bg-green-500"
            >
              Active
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryDataTable;
