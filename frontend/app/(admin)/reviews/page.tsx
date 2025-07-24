"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Search, Filter, Star, MessageSquare } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReviews, type Review } from "@/fetchers/review/queries";

const ratingColors = {
  1: "text-red-500",
  2: "text-orange-500",
  3: "text-yellow-500",
  4: "text-lime-500",
  5: "text-green-500",
};

// Mock store responses - In real app, this would be in the database
const storeResponses = new Map<number, string>([
  [
    2,
    "We apologize for the damaged product. Our customer service team has been notified and will contact you shortly for a replacement.",
  ],
  [
    4,
    "We're sorry to hear about your experience. Please reach out to our support team with more details so we can address your concerns.",
  ],
]);

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [minRating, setMinRating] = useState<number | "">("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [storeResponse, setStoreResponse] = useState("");

  const { data: reviews, isLoading } = useReviews();

  const handleAddResponse = async (reviewId: number) => {
    // In real app, this would be an API call
    storeResponses.set(reviewId, storeResponse);
    setShowResponseDialog(false);
    setStoreResponse("");
    // Force a re-render
    setSelectedReview(null);
  };

  const filteredReviews = reviews
    ? reviews.filter((review) => {
        const matchesSearch =
          review.comment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.user.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          review.user.lastName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          review.product.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRating =
          minRating === "" || review.rating >= Number(minRating);

        return matchesSearch && matchesRating;
      })
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h1 className="text-2xl font-semibold text-gray-900">Reviews</h1>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews..."
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "border-[#FFC633] text-[#FFC633]" : ""}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) =>
                setMinRating(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFC633]"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Star</option>
            </select>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-6">
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={review.user.profileUrl}
                      alt={`${review.user.firstName} ${review.user.lastName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {review.user.firstName} {review.user.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{review.user.email}</p>
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= review.rating
                                ? ratingColors[
                                    review.rating as keyof typeof ratingColors
                                  ]
                                : "text-gray-200"
                            }`}
                            fill={
                              star <= review.rating ? "currentColor" : "none"
                            }
                          />
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedReview(review);
                          setStoreResponse(storeResponses.get(review.id) || "");
                          setShowResponseDialog(true);
                        }}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {storeResponses.has(review.id)
                          ? "Edit Response"
                          : "Respond"}
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2 mb-1">
                      <Image
                        src={review.product.imageUrl}
                        alt={review.product.name}
                        width={24}
                        height={24}
                        className="rounded"
                      />
                      <span className="text-sm font-medium">
                        {review.product.name}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>

                    {/* Store Response */}
                    {storeResponses.has(review.id) && (
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-600">
                            Store Response
                          </span>
                        </div>
                        <p className="text-blue-700">
                          {storeResponses.get(review.id)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-500">
                Reviewed on {format(new Date(review.createdAt), "PPp")}
              </div>
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchQuery
                  ? "No reviews found matching your search."
                  : "No reviews found."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Response Dialog */}
      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Store Response</DialogTitle>
            <DialogDescription>
              Your response will be visible to all users. Be professional and
              helpful.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Your Response
              </label>
              <textarea
                value={storeResponse}
                onChange={(e) => setStoreResponse(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFC633]"
                rows={4}
                placeholder="Type your response here..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowResponseDialog(false);
                  setStoreResponse("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  selectedReview && handleAddResponse(selectedReview.id)
                }
                className="bg-[#FFC633] text-gray-900 hover:bg-[#FFD666]"
              >
                {storeResponses.has(selectedReview?.id || 0)
                  ? "Update"
                  : "Submit"}{" "}
                Response
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
