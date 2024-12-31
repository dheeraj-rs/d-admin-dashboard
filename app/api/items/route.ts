import connectDB from '@/lib/db';
import Item from '@/models/Item';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        const items = await Item.find({});
        return NextResponse.json(items, { status: 200 });
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const data = await request.json();
        
        // Validate required fields
        const requiredFields = ['name', 'image', 'type', 'category', 'price', 'url', 'description'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return NextResponse.json({ error: `${field} is required` }, { status: 400 });
            }
        }

        // Validate enums
        const validTypes = ['static', 'dynamic', 'ecommerce', 'blog', 'dashboard', 'portfolio', 'landing-page', 'admin-panel', 'free'];
        if (!validTypes.includes(data.type)) {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }

        const validCategories = ['free', 'paid', 'premium', 'e-com'];
        if (!validCategories.includes(data.category)) {
            return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }

        // Validate technologies
        const validTechnologies = ['react', 'vue', 'angular', 'html', 'tailwind', 'scss', 'typescript', 'nextjs', 'nodejs', 'css', 'next'];
        if (data.technologies) {
            for (const tech of data.technologies) {
                if (!validTechnologies.includes(tech)) {
                    return NextResponse.json({ error: `Invalid technology: ${tech}` }, { status: 400 });
                }
            }
        }

        // Set default price for free category
        if (data.category === 'free') {
            data.price = 0;
        }

        const newItem = new Item(data);
        await newItem.save();
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error('Error creating item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
