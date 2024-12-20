import ReviewCard from "./ReviewCard";

export default function Reviews() {
    return (
        <div className="container pt-2">
            <div className="font-bold text-xl py-2">
                All Reviews<span className="font-light"> (12)</span>
            </div>
            <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
        </div>
    )
}