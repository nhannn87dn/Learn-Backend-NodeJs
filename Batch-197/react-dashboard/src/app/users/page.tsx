"use client"

import { useState } from "react"
import { BaseLayout } from "@/components/layouts/base-layout"
import { StatCards } from "./components/stat-cards"
import { DataTable } from "./components/data-table"

import initialUsersData from "./data.json"
import { useQuery } from "@tanstack/react-query"
import axiosClient from "@/lib/axiosClient"

interface User {
  _id: string
  name: string
  email: string
  role: string
}

interface UserFormValues {
  name: string
  email: string
  role: string
  plan: string
  billing: string
  status: string
}

const fetchUsers = async()=>{
 const response = await axiosClient.get('v1/staffs')
 return response.data
}

export default function UsersPage() {
 

  const generateAvatar = (name: string) => {
    const names = name.split(" ")
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const handleAddUser = (userData: UserFormValues) => {
    console.log("Add user:", userData)
  }

  const handleDeleteUser = (id: number) => {
      console.log("Edit user:", id)
  }

  const handleEditUser = (user: User) => {
    // For now, just log the user to edit
    // In a real app, you'd open an edit dialog
    console.log("Edit user:", user)
  }

  //Gọi API Để lấy User qua React Query
  const queryUser = useQuery({
    queryFn: ()=>fetchUsers(),
    queryKey: ['users']
  })

  console.log('<<=== 🚀 queryUser ===>>',queryUser.data);

  return (
    <BaseLayout 
      title="Users" 
      description="Manage your users and their permissions"
    >
      <div className="flex flex-col gap-4">
        <div className="@container/main px-4 lg:px-6">
          <StatCards />
        </div>
        
        <div className="@container/main px-4 lg:px-6 mt-8 lg:mt-12">
         
          <DataTable 
            users={queryUser.data.data.records}
            onDeleteUser={handleDeleteUser}
            onEditUser={handleEditUser}
            onAddUser={handleAddUser}
          />
        </div>
      </div>
    </BaseLayout>
  )
}
