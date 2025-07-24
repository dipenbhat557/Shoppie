'use client'

import { MobileSidebar } from "../components/MobileSidebar";
import { ProfileImg } from "../components/ProfileImg";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { PaymentItems } from "./components/PaymentItems";
import { usePayments } from "@/fetchers/payment/queries";

export default function PaymentsPage() {
  const { isLoading, error } = usePayments();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading payments</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between md:pb-5">
        <MobileSidebar />
        <Header title="Payments" />
        <ProfileImg />
      </div>
      <MobileHeader title="Payments" />
      <PaymentItems />
    </div>
  );
}