"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import {
  fetchNameCategory,
  deleteProductById,
  fetchAllProduct,
} from "@/features/admin/adminThunk";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Plus } from "lucide-react";
import ProductCreateModal from "./ProductCreateModal";
import { RootState, AppDispatch } from "@/store/store";
import { ProductType } from "@/types/types";
import { Bounce, toast } from "react-toastify";
import { ProductHeader } from "./ProductHeader";

const ProductDataTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status } = useSelector(
    (state: RootState) => state.adminProductReducer
  );

  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  const refreshData = () => {
    dispatch(fetchAllProduct());
  };

  useEffect(() => {
    dispatch(fetchNameCategory());
    refreshData();
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(
        (product) =>
          product.pr_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category?.ct_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleDelete = async () => {
    try {
      if (deleteProductId) {
        await dispatch(deleteProductById(deleteProductId)).unwrap();
        refreshData(); // Refresh the data after successful deletion
        setIsDeleteModalOpen(false);
        setDeleteProductId(null);
        toast.success("Product Deleted Successfully", {
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
      toast.error(`Failed to delete product: ${error}`, {
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

  const formatCurrency = (amount: string | number) => {
    const numberAmount =
      typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numberAmount);
  };

  const columns = [
    {
      name: "No",
      cell: (_: ProductType, index: number) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Product Name",
      selector: (row: ProductType) => row.pr_name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: ProductType) => row.category?.ct_name || "-",
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: ProductType) => row.pr_price,
      sortable: true,
      format: (row: ProductType) => formatCurrency(row.pr_price),
    },
    {
      name: "Actions",
      cell: (row: ProductType) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setEditProduct(row);
              setIsCreateModalOpen(true);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => {
              setDeleteProductId(row.pr_id as number);
              setIsDeleteModalOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <ProductHeader onSearch={setSearchTerm} data={products} />

      <Button
        className="mb-4"
        onClick={() => {
          setEditProduct(null);
          setIsCreateModalOpen(true);
        }}
      >
        <Plus className="mr-2 h-4 w-4" /> Create Product
      </Button>

      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        responsive
        className="border"
        progressPending={status === "LOADING"}
        progressComponent={<div>Loading...</div>}
      />

      <ProductCreateModal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        initialData={editProduct}
        onSuccess={refreshData}
      />

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product?
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
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDataTable;
