'use client';
import { useCallback, useEffect, useState } from 'react';
import '@/styles/main/webconfig/webmanagement.scss';
import { VALID_WEBSITE_TYPES, VALID_CATEGORIES, VALID_TECHNOLOGIES } from '@/lib/constants';
import Link from 'next/link';

interface Item {
    _id: string;
    name: string;
    image: string;
    type: string;
    category: string;
    technologies: string[];
    price: number;
    url: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

const WebManagement = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [currentItem, setCurrentItem] = useState<Partial<Item>>({
        name: '',
        image: '',
        type: '',
        category: '',
        technologies: [],
        price: 0,
        url: '',
        description: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [istechnologiesDropdownOpen, setIsTechnologiesDropdownOpen] = useState(false);

    // Fetch items from API
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/items');
            const data = await response.json();
            setItems(data);
        };
        fetchItems();
    }, []);

    // Random generation utility
    const generateRandomFields = useCallback(() => {
        const randomProductId = Math.random().toString(36).substr(2, 9);
        const randomType = VALID_WEBSITE_TYPES[Math.floor(Math.random() * VALID_WEBSITE_TYPES.length)];
        const randomCategory = VALID_CATEGORIES[Math.floor(Math.random() * VALID_CATEGORIES.length)];
        const images = [
            'https://t4.ftcdn.net/jpg/02/83/46/33/360_F_283463385_mfnrx6RPU3BqObhVuVjYZjeZ5pegE7xq.jpg',
            'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://colibriwp.com/blog/wp-content/uploads/2018/07/banner-redimensionat.jpg',
            'https://cdn.dribbble.com/userupload/14408827/file/original-d3016b85b5211e20bc6345297026be67.jpg?format=webp&resize=400x300&vertical=center',
            'https://cdn.dribbble.com/users/6657271/screenshots/15799880/media/3358bc6b0e6a592baa53ac231beda57a.png?resize=400x0',
            'https://www.shutterstock.com/image-vector/vector-image-trendy-design-web-260nw-1746201704.jpg',
            'https://cdn.dribbble.com/userupload/4287187/file/original-e7086b44464c24bac20aca5137cdf5b9.jpeg?resize=400x0',
            'https://templatesjungle.com/wp-content/uploads/edd/2023/03/vaso-interior-decor-free-ecommerce-website-figma-template-cover-1024x768.jpg'
        ];
        const randomImage = images[Math.floor(Math.random() * images.length)];

        return {
            name: `${randomType} Template`,
            type: randomType,
            category: randomCategory,
            technologies: VALID_TECHNOLOGIES.sort(() => 0.5 - Math.random()).slice(0, 2),
            price: randomCategory === 'free' ? 0 : parseFloat((Math.random() * 100).toFixed(2)),
            image: randomImage,
            url: `https://example.com/product/${randomProductId}`,
            description: 'A modern and sleek template with cutting-edge design',
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'category') {
            // Automatically set price to 0 for 'free' category
            const newPrice = value === 'free' ? 0 : (currentItem.price || 0);
            
            setCurrentItem((prev) => ({
                ...prev,
                category: value,
                price: newPrice,
            }));
        } else if (name === 'image') {
            // Existing image handling code
            setCurrentItem((prev) => ({
                ...prev,
                [name]: value,
            }));
            setImageError(false);

            const img = new Image();
            img.onload = () => {
                setImagePreview(value);
                setImageError(false);
            };
            img.onerror = () => {
                setImagePreview(null);
                setImageError(true);
            };
            img.src = value;
        } else {
            setCurrentItem((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (imageError) {
            alert('Please provide a valid image URL');
            return;
        }

        if (isEditing && editingId) {
            // Update existing item
            await fetch(`/api/items/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...currentItem,
                    updatedAt: new Date().toISOString(),
                }),
            });
            setItems((prev) => prev.map((item) => (item._id === editingId ? { ...item, ...currentItem, updatedAt: new Date().toISOString() } : item)));
            setIsEditing(false);
            setEditingId(null);
        } else {
            // Add new item
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...currentItem,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            });
            const newItem = await response.json();
            setItems((prev) => [...prev, newItem]);
        }

        // Reset form and close modal
        resetForm();
        setIsModalOpen(false);
    };

    const resetForm = () => {
        setCurrentItem({
            name: '',
            image: '',
            type: '',
            category: '',
            technologies: [],
            price: 0,
            url: '',
            description: '',
        });
        setImagePreview(null);
        setImageError(false);
        setIsEditing(false);
        setEditingId(null);
    };

    const handleEdit = (item: Item) => {
        setCurrentItem(item);
        setIsEditing(true);
        setEditingId(item._id);
        setImagePreview(item.image);
        setIsModalOpen(true);
    };

    // Handle delete
    const handleDelete = async (id: string) => {
        await fetch(`/api/items/${id}`, {
            method: 'DELETE',
        });
        setItems((prev) => prev.filter((item) => item._id !== id));
    };

    const handleFillRandom = () => {
        const randomFields = generateRandomFields();
        setCurrentItem((prev) => ({
            ...prev,
            ...randomFields,
        }));
        setImagePreview(randomFields.image);
        setImageError(false);
    };

    const handleTechnologiesChange = (tech: string) => {
        setCurrentItem((prev) => {
            const currentTechnologies = prev.technologies || [];
            const newTechnologies = currentTechnologies.includes(tech) ? currentTechnologies.filter((t) => t !== tech) : [...currentTechnologies, tech];

            return {
                ...prev,
                technologies: newTechnologies,
            };
        });
    };

    const renderTechnologiesDropdown = () => {
        const selectedTechnologies = currentItem.technologies || [];

        return (
            <div className="item-management__technologies-dropdown">
                <div className="item-management__technologies-selected" onClick={() => setIsTechnologiesDropdownOpen(!istechnologiesDropdownOpen)}>
                    {selectedTechnologies.length > 0 ? selectedTechnologies.join(', ') : 'Select Technologies'}
                </div>
                {istechnologiesDropdownOpen && (
                    <div className="item-management__technologies-options">
                        {VALID_TECHNOLOGIES.map((tech) => (
                            <label key={tech} className="item-management__technologies-option">
                                <input type="checkbox" checked={selectedTechnologies.includes(tech)} onChange={() => handleTechnologiesChange(tech)} />
                                {tech}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="item-management">
            <div className="item-management__header">
                <h1>Website Management</h1>
                <button
                    type="button"
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="item-management__add-button"
                >
                    Add New Product
                </button>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="item-management__modal-overlay">
                    <div className="item-management__modal">
                        <button className="item-management__modal-close" onClick={() => setIsModalOpen(false)}>
                            &times;
                        </button>
                        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={handleSubmit} className="item-management__form">
                            <div className="item-management__form-grid">
                                <div className="item-management__form-column">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Product Name"
                                        value={currentItem.name || ''}
                                        onChange={handleInputChange}
                                        className="item-management__form-input"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="image"
                                        placeholder="Image URL"
                                        value={currentItem.image || ''}
                                        onChange={handleInputChange}
                                        className="item-management__form-input"
                                        required
                                    />

                                    <div className="item-management__image-preview">
                                        {imageError ? (
                                            <div className="item-management__image-error">Invalid Image URL</div>
                                        ) : imagePreview ? (
                                            <img src={imagePreview} alt="Product Preview" className="item-management__preview-image" />
                                        ) : (
                                            <div className="item-management__image-placeholder">No Image Uploaded</div>
                                        )}
                                    </div>
                                </div>

                                <div className="item-management__form-column">
                                    <select
                                        name="type"
                                        value={currentItem.type || ''}
                                        onChange={handleInputChange}
                                        className="item-management__form-input"
                                        required
                                    >
                                        <option value="">Select Product Type</option>
                                        {VALID_WEBSITE_TYPES.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>

                                        ))}
                                    </select>

                                    <select
                                        name="category"
                                        value={currentItem.category || ''}
                                        onChange={handleInputChange}
                                        className="item-management__form-input"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {VALID_CATEGORIES.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="item-management__form-input-wrapper">
                                        <label>Technologies</label>
                                        {renderTechnologiesDropdown()}
                                    </div>

                                    <input
                                        type="number"
                                            name="price"
                                            placeholder="Price"
                                            value={currentItem.category !== 'free'? currentItem.price : 0}
                                            onChange={handleInputChange}
                                            className="item-management__form-input"
                                            step="0.01"
                                            required
                                    />

                                    <input
                                        type="text"
                                        name="url"
                                        placeholder="Product URL"
                                        value={currentItem.url || ''}
                                        onChange={handleInputChange}
                                        className="item-management__form-input"
                                        required
                                    />

                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        value={currentItem.description || ''}
                                        onChange={handleInputChange}
                                        className="item-management__form-input item-management__form-textarea"
                                        required
                                    />

                                    <div className="item-management__form-actions">
                                        <button type="button" onClick={handleFillRandom} className="item-management__random-button">
                                            Fill Random
                                        </button>
                                        <button type="submit" className="item-management__submit-button">
                                            {isEditing ? 'Update Product' : 'Add Product'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="item-management__product-list">
                {items.map((item) => (
                    <div key={item._id} className="item-management__product-card">
                        <div className="item-management__product-card-image">
                            <img src={item.image} alt={item.name} />
                            <Link 
                                href={`/webconfig/editor/${item._id}`}
                                className="item-management__edit-button"
                                title="Edit in Website Editor"
                            >
                                <i className="pi pi-pencil"></i>
                            </Link>
                        </div>
                        <div className="item-management__product-card-details">
                            <h3>{item.name}</h3>
                            <p>
                                <strong>Type:</strong> {item.type}
                            </p>
                            <p>
                                <strong>Category:</strong> {item.category}
                            </p>
                            <p>
                                <strong>Technologies:</strong> {item.technologies?.join(', ')}
                            </p>
                            <p>
                                <strong>Price:</strong> ${item.price.toFixed(2)}
                            </p>
                            <p>
                                <strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}
                            </p>
                            <div className="item-management__product-card-actions">
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="item-management__product-card-link">
                                    View
                                </a>
                                <div className="item-management__product-card-buttons">
                                    <button onClick={() => handleEdit(item)} className="item-management__product-card-edit">
                                        Edit Details
                                    </button>
                                    <button onClick={() => handleDelete(item._id)} className="item-management__product-card-delete">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WebManagement;
