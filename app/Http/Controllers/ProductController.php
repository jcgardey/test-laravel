<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(User $user) 
    {
        return response()->json($user->products, 200);
    }
    /**
     * Create and store new product.
     *
     */
    public function store(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);
        return Product::create(['user_id' => $user->id,'name' => $request->input('name'), 'description' => $request->input('description') ]);
    }

    public function delete(Product $product)
    {
        $product->delete();
        return response()->json($product, 204);
    }

    public function update(Request $request, Product $product) 
    {
        $product->update($request->all());
        //return response()->json($product, 200);
        return $product;
    }

}