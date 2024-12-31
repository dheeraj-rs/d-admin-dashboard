import { Schema, model, models } from 'mongoose';

export interface Item {
    name: string;
    url: string;
    type: string;
    category: string;
    technologies: string[];
    price: number;
    image?: string;
    description?: string;
}

const ItemSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['static', 'dynamic', 'ecommerce', 'blog', 'dashboard', 'portfolio', 'landing-page', 'admin-panel', 'free'],
        },
        category: {
            type: String,
            required: true,
            enum: ['free', 'paid', 'premium', 'e-com'],
        },
        technologies: [
            {
                type: String,
                enum: ['react', 'vue', 'angular', 'html', 'tailwind', 'scss', 'typescript', 'nextjs', 'nodejs', 'css', 'next'],
            },
        ],
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        url: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const ItemModel = models.Item || model('Item', ItemSchema);

export default ItemModel;
