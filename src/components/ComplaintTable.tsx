"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: "Product" | "Service" | "Support";
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Resolved";
  dateSubmitted: string;
  userId?: {
    name: string;
    email: string;
  };
}

export function ComplaintTable() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  // Fetch complaints from API
  const fetchComplaints = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/complaints");
      const result = await response.json();

      if (response.ok) {
        setComplaints(result.data);
        setFilteredComplaints(result.data);
      } else {
        setError(result.message || "Failed to fetch feedback");
      }
    } catch (error) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update complaint status
  const updateComplaintStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/complaints/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedComplaints = complaints.map(complaint =>
          complaint._id === id ? { ...complaint, status: newStatus as "Pending" | "In Progress" | "Resolved" } : complaint
        );
        setComplaints(updatedComplaints);
        applyFilters(updatedComplaints, statusFilter, priorityFilter);
      } else {
        const result = await response.json();
        setError(result.message || "Failed to update feedback");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  // Delete complaint
  const deleteComplaint = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback entry?")) {
      return;
    }

    try {
      const response = await fetch(`/api/complaints/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedComplaints = complaints.filter(complaint => complaint._id !== id);
        setComplaints(updatedComplaints);
        applyFilters(updatedComplaints, statusFilter, priorityFilter);
      } else {
        const result = await response.json();
        setError(result.message || "Failed to delete feedback");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  // Apply filters
  const applyFilters = (complaintsData: Complaint[], status: string, priority: string) => {
    let filtered = complaintsData;

    if (status !== "all") {
      filtered = filtered.filter(complaint => complaint.status === status);
    }

    if (priority !== "all") {
      filtered = filtered.filter(complaint => complaint.priority === priority);
    }

    setFilteredComplaints(filtered);
  };

  // Handle filter changes
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    applyFilters(complaints, value, priorityFilter);
  };

  const handlePriorityFilterChange = (value: string) => {
    setPriorityFilter(value);
    applyFilters(complaints, statusFilter, value);
  };

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-[#DC3545]/10 text-[#DC3545] border-[#DC3545]/30";
      case "Medium": return "bg-[#FF6600]/10 text-[#FF6600] border-[#FF6600]/30";
      case "Low": return "bg-[#99CC99]/10 text-[#2E7D32] border-[#99CC99]/30";
      default: return "bg-[#6C757D]/10 text-[#6C757D] border-[#6C757D]/30";
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-[#FF6600]/10 text-[#FF6600] border-[#FF6600]/30";
      case "In Progress": return "bg-[#003366]/10 text-[#003366] border-[#003366]/30";
      case "Resolved": return "bg-[#99CC99]/10 text-[#2E7D32] border-[#99CC99]/30";
      default: return "bg-[#6C757D]/10 text-[#6C757D] border-[#6C757D]/30";
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Product": return "🏨";
      case "Service": return "🚗";
      case "Support": return "👥";
      default: return "📝";
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg font-body text-[#6C757D]">Loading travel experiences...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-heading font-bold text-[#003366]">Guest Feedback Management</h2>
        <Button 
          onClick={fetchComplaints} 
          variant="outline"
          className="border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-body font-medium transition-all duration-300 rounded-xl px-4 py-2"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
          Refresh
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-[#DC3545]/10 text-[#DC3545] border-2 border-[#DC3545]/30 rounded-xl">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span className="font-body">{error}</span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="space-y-3">
          <label className="text-sm font-body font-medium text-[#003366]">Filter by Status:</label>
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-full sm:w-48 border-2 border-[#E9ECEF] rounded-xl font-body">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2 border-[#E9ECEF]">
              <SelectItem value="all" className="font-body">All Statuses</SelectItem>
              <SelectItem value="Pending" className="font-body">⏳ Pending</SelectItem>
              <SelectItem value="In Progress" className="font-body">🔄 In Progress</SelectItem>
              <SelectItem value="Resolved" className="font-body">✅ Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-body font-medium text-[#003366]">Filter by Priority:</label>
          <Select value={priorityFilter} onValueChange={handlePriorityFilterChange}>
            <SelectTrigger className="w-full sm:w-48 border-2 border-[#E9ECEF] rounded-xl font-body">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2 border-[#E9ECEF]">
              <SelectItem value="all" className="font-body">All Priorities</SelectItem>
              <SelectItem value="High" className="font-body">🔴 High</SelectItem>
              <SelectItem value="Medium" className="font-body">🟠 Medium</SelectItem>
              <SelectItem value="Low" className="font-body">🟢 Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border-2 border-[#E9ECEF] rounded-2xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F8F9FA] hover:bg-[#F8F9FA]">
                <TableHead className="min-w-[200px] font-heading font-semibold text-[#003366]">Experience</TableHead>
                <TableHead className="min-w-[120px] font-heading font-semibold text-[#003366]">Category</TableHead>
                <TableHead className="min-w-[100px] font-heading font-semibold text-[#003366]">Priority</TableHead>
                <TableHead className="min-w-[120px] font-heading font-semibold text-[#003366]">Status</TableHead>
                <TableHead className="min-w-[120px] font-heading font-semibold text-[#003366]">Date</TableHead>
                <TableHead className="min-w-[120px] font-heading font-semibold text-[#003366]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-[#6C757D] font-body">
                    <div className="flex flex-col items-center space-y-3">
                      <svg className="w-12 h-12 text-[#E9ECEF]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                      </svg>
                      <span>No feedback experiences found</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredComplaints.map((complaint) => (
                  <TableRow key={complaint._id} className="hover:bg-[#F8F9FA]/50 transition-colors duration-200">
                    <TableCell>
                      <div>
                        <div className="font-heading font-medium text-[#003366]">{complaint.title}</div>
                        <div className="text-sm text-[#6C757D] mt-1 line-clamp-2 font-body">
                          {complaint.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-body border-[#E9ECEF] text-[#6C757D]">
                        {getCategoryIcon(complaint.category)} {complaint.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getPriorityColor(complaint.priority)} font-body`}>
                        {complaint.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={complaint.status}
                        onValueChange={(value) => updateComplaintStatus(complaint._id, value)}
                      >
                        <SelectTrigger className="w-full border-2 border-[#E9ECEF] rounded-xl font-body">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2 border-[#E9ECEF]">
                          <SelectItem value="Pending" className="font-body">⏳ Pending</SelectItem>
                          <SelectItem value="In Progress" className="font-body">🔄 In Progress</SelectItem>
                          <SelectItem value="Resolved" className="font-body">✅ Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <span className="font-body text-[#6C757D]">
                        {new Date(complaint.dateSubmitted).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteComplaint(complaint._id)}
                        className="bg-[#DC3545] hover:bg-[#C82333] text-white font-body font-medium rounded-xl px-3 py-1"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-[#6C757D] font-body bg-[#F8F9FA] rounded-xl p-4 text-center">
        Showing {filteredComplaints.length} of {complaints.length} travel experiences
      </div>
    </div>
  );
}
