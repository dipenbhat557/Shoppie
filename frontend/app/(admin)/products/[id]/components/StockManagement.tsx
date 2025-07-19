"use client";

import { useState } from "react";
import { Package, AlertTriangle, ArrowUpRight, ArrowDownRight, Store, Edit2, Save, X } from "lucide-react";

interface StockLocation {
  id: number;
  name: string;
  address: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  lastRestocked: Date;
}

// Mock data
const mockLocations: StockLocation[] = [
  {
    id: 1,
    name: "Main Warehouse",
    address: "123 Warehouse St, City",
    currentStock: 150,
    minStock: 50,
    maxStock: 500,
    reorderPoint: 100,
    lastRestocked: new Date("2024-03-10")
  },
  {
    id: 2,
    name: "Downtown Store",
    address: "456 Main St, Downtown",
    currentStock: 25,
    minStock: 20,
    maxStock: 100,
    reorderPoint: 30,
    lastRestocked: new Date("2024-03-12")
  },
  {
    id: 3,
    name: "Mall Location",
    address: "789 Mall Ave, Shopping District",
    currentStock: 45,
    minStock: 30,
    maxStock: 150,
    reorderPoint: 50,
    lastRestocked: new Date("2024-03-15")
  }
];

export function StockManagement() {
  const [locations, setLocations] = useState(mockLocations);
  const [editingLocation, setEditingLocation] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<StockLocation>>({});

  const totalStock = locations.reduce((sum, loc) => sum + loc.currentStock, 0);
  const lowStockLocations = locations.filter(loc => loc.currentStock <= loc.reorderPoint);

  const handleEdit = (location: StockLocation) => {
    setEditingLocation(location.id);
    setEditForm(location);
  };

  const handleSave = () => {
    if (editingLocation) {
      setLocations(locations.map(loc =>
        loc.id === editingLocation
          ? { ...loc, ...editForm }
          : loc
      ));
      setEditingLocation(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingLocation(null);
    setEditForm({});
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Stock</p>
              <h3 className="text-2xl font-semibold mt-1">{totalStock} units</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Alerts</p>
              <h3 className="text-2xl font-semibold mt-1">{lowStockLocations.length} locations</h3>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Store Locations</p>
              <h3 className="text-2xl font-semibold mt-1">{locations.length}</h3>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Store className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Stock by Location</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4">Min Stock</th>
                <th className="px-6 py-4">Max Stock</th>
                <th className="px-6 py-4">Reorder Point</th>
                <th className="px-6 py-4">Last Restocked</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {locations.map((location) => (
                <tr key={location.id} className="hover:bg-gray-50">
                  {editingLocation === location.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.name || ""}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-1.5 rounded border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={editForm.currentStock || 0}
                          onChange={(e) => setEditForm({ ...editForm, currentStock: parseInt(e.target.value) })}
                          className="w-24 px-3 py-1.5 rounded border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={editForm.minStock || 0}
                          onChange={(e) => setEditForm({ ...editForm, minStock: parseInt(e.target.value) })}
                          className="w-24 px-3 py-1.5 rounded border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={editForm.maxStock || 0}
                          onChange={(e) => setEditForm({ ...editForm, maxStock: parseInt(e.target.value) })}
                          className="w-24 px-3 py-1.5 rounded border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={editForm.reorderPoint || 0}
                          onChange={(e) => setEditForm({ ...editForm, reorderPoint: parseInt(e.target.value) })}
                          className="w-24 px-3 py-1.5 rounded border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                        />
                      </td>
                      <td className="px-6 py-4">
                        {new Date(location.lastRestocked).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleSave}
                            className="p-1 text-green-600 hover:text-green-700"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{location.name}</div>
                          <div className="text-sm text-gray-500">{location.address}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{location.currentStock}</span>
                          {location.currentStock <= location.reorderPoint && (
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{location.minStock}</td>
                      <td className="px-6 py-4 text-gray-500">{location.maxStock}</td>
                      <td className="px-6 py-4 text-gray-500">{location.reorderPoint}</td>
                      <td className="px-6 py-4">
                        {new Date(location.lastRestocked).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEdit(location)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Movement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Stock In</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Main Warehouse</div>
                  <div className="text-sm text-gray-500">+50 units</div>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            {/* Add more stock in entries */}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Stock Out</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <div className="font-medium">Downtown Store</div>
                  <div className="text-sm text-gray-500">-15 units</div>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </div>
            {/* Add more stock out entries */}
          </div>
        </div>
      </div>
    </div>
  );
} 