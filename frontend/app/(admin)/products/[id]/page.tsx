"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductInfo } from "./components/ProductInfo";
import { VariantList } from "./components/VariantList";
import { VariantDetail } from "./components/VariantDetail";

interface TabItem {
  id: string;
  label: string;
  component: React.ComponentType<any>;
}

const tabs: TabItem[] = [
  {
    id: "info",
    label: "Info",
    component: ProductInfo,
  },
  {
    id: "variants",
    label: "Variants",
    component: VariantList,
  },
  {
    id: "variant-detail",
    label: "Variant Detail",
    component: VariantDetail,
  }
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("info");
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  const handleVariantSelect = (variantId: string) => {
    setSelectedVariantId(variantId);
    setActiveTab("variant-detail");
  };

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  // Hide variant-detail tab unless a variant is selected
  const visibleTabs = tabs.filter(tab => 
    tab.id !== "variant-detail" || (tab.id === "variant-detail" && selectedVariantId)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => {
            if (activeTab === "variant-detail") {
              setActiveTab("variants");
              setSelectedVariantId(null);
            } else {
              router.back();
            }
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            {activeTab === "variant-detail" ? "Back to Variants" : "Back to Products"}
          </span>
        </button>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex items-center gap-6 px-6">
              {visibleTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 text-sm font-medium relative ${
                    activeTab === tab.id
                      ? "text-[#FFC633]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC633]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="min-h-[500px]">
            {ActiveComponent && (
              <ActiveComponent 
                productId={params.id} 
                onVariantSelect={handleVariantSelect}
                selectedVariantId={selectedVariantId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
