import React, { useState } from 'react';
import { useShop, type Address } from '../context/ShopContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const IconMapPin = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconPlus = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const IconEdit = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const IconTrash = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconCheck = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const EMPTY_FORM: Omit<Address, 'id'> = {
  name: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  phone: '',
  isDefault: false,
};

interface AddressFormProps {
  initial: Omit<Address, 'id'>;
  onSave: (data: Omit<Address, 'id'>) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial);

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={form[key] as string}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-900 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all"
      />
    </div>
  );

  const isValid = form.name && form.street && form.city && form.state && form.country;

  return (
    <div className="bg-sky-50/60 rounded-3xl border border-sky-200/60 p-6 space-y-5">
      <h3 className="font-bold text-slate-900 text-sm">Address Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field('name', 'Address Label', 'text', 'e.g. Home, Office')}
        {field('phone', 'Phone', 'tel', '+1 (555) 000-0000')}
        <div className="sm:col-span-2">{field('street', 'Street Address', 'text', '123 Faith Street')}</div>
        {field('city', 'City', 'text', 'Your City')}
        {field('state', 'State / Province', 'text', 'State')}
        {field('postalCode', 'Postal Code', 'text', '00000')}
        {field('country', 'Country', 'text', 'Country')}
      </div>
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
            form.isDefault ? 'bg-sky-500 border-sky-500' : 'bg-white border-slate-300'
          }`}
          onClick={() => setForm((f) => ({ ...f, isDefault: !f.isDefault }))}
        >
          {form.isDefault && <IconCheck className="w-3 h-3 text-white" />}
        </div>
        <span className="text-sm text-slate-700 font-medium">Set as default address</span>
      </label>
      <div className="flex items-center gap-3">
        <button
          onClick={() => isValid && onSave(form)}
          disabled={!isValid}
          className={`inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-2xl transition-all text-sm ${
            isValid
              ? 'bg-sky-500 hover:bg-sky-600 text-white shadow-sm shadow-sky-500/20'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <IconCheck className="w-4 h-4" />
          Save Address
        </button>
        <button
          onClick={onCancel}
          className="text-slate-600 font-semibold text-sm px-4 py-2.5 rounded-2xl hover:bg-slate-100 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const AddressesPage: React.FC = () => {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useShop();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = (data: Omit<Address, 'id'>) => {
    addAddress(data);
    setShowForm(false);
  };

  const handleEdit = (id: string, data: Omit<Address, 'id'>) => {
    updateAddress(id, data);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-slate-900 font-sans flex flex-col selection:bg-sky-200">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Header */}
        <div className="border-b border-sky-100 pb-6 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <IconMapPin className="w-3.5 h-3.5" />
            <span>Delivery</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Addresses</h1>
              <p className="text-slate-500 text-sm mt-1">Manage your saved delivery addresses.</p>
            </div>
            {!showForm && (
              <button
                id="add-address-btn"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-4 py-2.5 rounded-2xl text-sm transition-all shadow-sm shadow-sky-500/20"
              >
                <IconPlus className="w-4 h-4" />
                Add New
              </button>
            )}
          </div>
        </div>

        {/* New Address Form */}
        {showForm && (
          <AddressForm
            initial={{ ...EMPTY_FORM }}
            onSave={handleAdd}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Addresses List */}
        {addresses.length === 0 && !showForm ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center">
              <IconMapPin className="w-10 h-10 text-sky-300" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-800">No addresses yet</h2>
              <p className="text-slate-500 text-sm mt-1">Add an address to speed up checkout.</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-md shadow-sky-500/25"
            >
              <IconPlus className="w-4 h-4" />
              Add Address
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="space-y-3">
                {editingId === addr.id ? (
                  <AddressForm
                    initial={{ ...addr }}
                    onSave={(data) => handleEdit(addr.id, data)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <div
                    className={`bg-white rounded-3xl border shadow-xs p-5 flex flex-col sm:flex-row items-start gap-4 transition-all ${
                      addr.isDefault
                        ? 'border-sky-300/70 ring-2 ring-sky-100'
                        : 'border-slate-200/80'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center ${
                        addr.isDefault ? 'bg-sky-500' : 'bg-slate-100'
                      }`}
                    >
                      <IconMapPin className={`w-5 h-5 ${addr.isDefault ? 'text-white' : 'text-slate-400'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-sm">{addr.name}</h3>
                        {addr.isDefault && (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {addr.street}, {addr.city}, {addr.state} {addr.postalCode}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">{addr.country} · {addr.phone}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-xs font-semibold text-sky-600 hover:text-sky-700 px-3 py-1.5 rounded-xl hover:bg-sky-50 transition-all"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => setEditingId(addr.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                        title="Edit"
                      >
                        <IconEdit />
                      </button>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                        title="Delete"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AddressesPage;
