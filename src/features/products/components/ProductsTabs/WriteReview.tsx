"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { useCreateReviewsMutation } from "@/store/api/reviewApi/reviewApi";
import { toast } from "react-toastify";
import { IErrorResponse } from "@/types/types";



const WriteReview:React.FC<{ productId: string }> = ({ productId }) => {
  
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [createReview, { isLoading }] = useCreateReviewsMutation();

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      return toast.error("Please provide a rating before submitting your review.");
    }

    try {
      await createReview({ rating, comment,productId}).unwrap();
      
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
    } catch (err) {
      const error = err as IErrorResponse;
      toast.error(`Failed to submit review: ${error?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="max-w-full p-6 bg-gray-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm">
      <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">Add a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="text-sm font-medium text-zinc-500 mb-2">Your Rating</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform active:scale-90"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  size={28}
                  className={`${
                    star <= (hover || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-zinc-300 dark:text-zinc-700"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="text-sm font-medium text-zinc-500 block mb-2">
            Your Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback here..."
            className="w-full p-4 min-h-[120px] bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all resize-none text-zinc-800 dark:text-zinc-200"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading} 
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 transition-colors shadow-lg shadow-green-600/20 disabled:bg-gray-400"
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default WriteReview;