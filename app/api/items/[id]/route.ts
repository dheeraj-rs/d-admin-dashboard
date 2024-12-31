import connectDB from '@/lib/db';
import Item from '@/models/Item';
import { NextResponse } from 'next/server';

export async function GET(request: any, { params }: { params: any }) {
    try {
        await connectDB();
        const item = await Item.findById(params.id);
        if (!item) {
            return new Response('Item not found', { status: 404 });
        }
        return new Response(JSON.stringify(item), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching item:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const data = await request.json();
        
        // Validate enums if provided
        if (data.type) {
            const validTypes = ['static', 'dynamic', 'ecommerce', 'blog', 'dashboard', 'portfolio', 'landing-page', 'admin-panel', 'free'];
            if (!validTypes.includes(data.type)) {
                return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
            }
        }

        if (data.category) {
            const validCategories = ['free', 'paid', 'premium', 'e-com'];
            if (!validCategories.includes(data.category)) {
                return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
            }
        }

        // Validate technologies if provided
        if (data.technologies) {
            const validTechnologies = ['react', 'vue', 'angular', 'html', 'tailwind', 'scss', 'typescript', 'nextjs', 'nodejs', 'css', 'next'];
            for (const tech of data.technologies) {
                if (!validTechnologies.includes(tech)) {
                    return NextResponse.json({ error: `Invalid technology: ${tech}` }, { status: 400 });
                }
            }
        }

        // Force price to 0 for free category
        if (data.category === 'free') {
            data.price = 0;
        }

        const updatedItem = await Item.findByIdAndUpdate(
            params.id,
            data,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
        console.error('Error updating item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: any, { params }: { params: any }) {
    try {
        await connectDB();
        const deletedItem = await Item.findByIdAndDelete(params.id);
        if (!deletedItem) {
            return new Response('Item not found', { status: 404 });
        }
        return new Response('Item deleted', { status: 200 });
    } catch (error) {
        console.error('Error deleting item:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
