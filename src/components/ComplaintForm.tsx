"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Zod schema for form validation
const complaintSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  category: z.enum(["Product", "Service", "Support"], { required_error: "Please select a category" }),
  priority: z.enum(["Low", "Medium", "High"], { required_error: "Please select a priority" }),
});

type ComplaintFormData = z.infer<typeof complaintSchema>;

interface ComplaintFormProps {
  onSuccess?: () => void;
}

export function ComplaintForm({ onSuccess }: ComplaintFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
      priority: undefined,
    }
  });

  const watchedCategory = watch("category");
  const watchedPriority = watch("priority");

  const onSubmit = async (data: ComplaintFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: "success", message: "Thank you for sharing your experience! We'll review your feedback and get back to you soon." });
        reset();
        onSuccess?.();
      } else {
        setSubmitMessage({ 
          type: "error", 
          message: result.message || "Failed to submit feedback. Please try again." 
        });
      }
    } catch (error) {
      setSubmitMessage({ 
        type: "error", 
        message: "Network error. Please check your connection and try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-heading font-bold mb-8 text-[#003366] text-center">
        Share Your Travel Experience
      </h2>
      
      {submitMessage && (
        <div className={`mb-6 p-4 rounded-xl border-2 ${
          submitMessage.type === "success" 
            ? "bg-[#99CC99]/10 text-[#2E7D32] border-[#99CC99]/30" 
            : "bg-[#DC3545]/10 text-[#DC3545] border-[#DC3545]/30"
        }`}>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              {submitMessage.type === "success" ? (
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              ) : (
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              )}
            </svg>
            <span className="font-body">{submitMessage.message}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title Field */}
        <div className="space-y-3">
          <Label htmlFor="title" className="text-[#003366] font-body font-medium">
            Experience Title
          </Label>
          <Input
            id="title"
            placeholder="Brief title for your travel experience"
            {...register("title")}
            className={`border-2 rounded-xl px-4 py-3 font-body transition-all duration-300 focus:ring-2 focus:ring-[#003366]/20 ${
              errors.title ? "border-[#DC3545] focus:border-[#DC3545]" : "border-[#E9ECEF] focus:border-[#003366]"
            }`}
          />
          {errors.title && (
            <p className="text-sm text-[#DC3545] font-body">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="space-y-3">
          <Label htmlFor="description" className="text-[#003366] font-body font-medium">
            Detailed Experience
          </Label>
          <Textarea
            id="description"
            placeholder="Tell us about your travel experience, suggestions, or any concerns you'd like us to address..."
            rows={5}
            {...register("description")}
            className={`border-2 rounded-xl px-4 py-3 font-body transition-all duration-300 focus:ring-2 focus:ring-[#003366]/20 ${
              errors.description ? "border-[#DC3545] focus:border-[#DC3545]" : "border-[#E9ECEF] focus:border-[#003366]"
            }`}
          />
          {errors.description && (
            <p className="text-sm text-[#DC3545] font-body">{errors.description.message}</p>
          )}
        </div>

        {/* Category Field */}
        <div className="space-y-3">
          <Label className="text-[#003366] font-body font-medium">Experience Category</Label>
          <Select
            value={watchedCategory}
            onValueChange={(value) => setValue("category", value as "Product" | "Service" | "Support")}
          >
            <SelectTrigger className={`border-2 rounded-xl px-4 py-3 font-body transition-all duration-300 focus:ring-2 focus:ring-[#003366]/20 ${
              errors.category ? "border-[#DC3545] focus:border-[#DC3545]" : "border-[#E9ECEF] focus:border-[#003366]"
            }`}>
              <SelectValue placeholder="Select the category that best fits your experience" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2 border-[#E9ECEF]">
              <SelectItem value="Product" className="font-body">🏨 Product & Accommodation</SelectItem>
              <SelectItem value="Service" className="font-body">🚗 Service & Transportation</SelectItem>
              <SelectItem value="Support" className="font-body">👥 Support & Customer Care</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-[#DC3545] font-body">{errors.category.message}</p>
          )}
        </div>

        {/* Priority Field */}
        <div className="space-y-3">
          <Label className="text-[#003366] font-body font-medium">Priority Level</Label>
          <RadioGroup
            value={watchedPriority}
            onValueChange={(value) => setValue("priority", value as "Low" | "Medium" | "High")}
            className="flex flex-wrap gap-6"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="Low" id="low" className="text-[#99CC99] border-[#99CC99]" />
              <Label htmlFor="low" className="font-body text-[#6C757D] cursor-pointer">Low Priority</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="Medium" id="medium" className="text-[#FF6600] border-[#FF6600]" />
              <Label htmlFor="medium" className="font-body text-[#6C757D] cursor-pointer">Medium Priority</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="High" id="high" className="text-[#DC3545] border-[#DC3545]" />
              <Label htmlFor="high" className="font-body text-[#6C757D] cursor-pointer">High Priority</Label>
            </div>
          </RadioGroup>
          {errors.priority && (
            <p className="text-sm text-[#DC3545] font-body">{errors.priority.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting}
            className="w-full bg-[#FF6600] hover:bg-[#E55A00] text-white font-heading font-medium text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0 disabled:opacity-50 disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
                <span>Share Experience</span>
              </div>
            )}
        </Button>
        </div>
      </form>
    </div>
  );
}
