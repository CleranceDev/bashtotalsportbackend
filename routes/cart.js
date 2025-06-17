// Add item to cart (simplified example)
app.post('/api/cart', async (req, res) => {
    const { prod_id, user_id, quantity, price } = req.body;
    const total = price * quantity;
  
    try {
      const result = await query(
        'INSERT INTO cart (prod_id, user_id, quantity, total, price) VALUES (?, ?, ?, ?, ?)',
        [prod_id, user_id, quantity, total, price]
      );
      res.status(201).json({ message: 'Item added to cart', data: result });
    } catch (err) {
      res.status(500).json({ message: 'Error adding item to cart', error: err });
    }
  });
  
  // Place an order (move items from cart to orders table)
  app.post('/api/orders', async (req, res) => {
    const { user_id } = req.body;
  
    try {
      // Fetch all cart items for the user
      const cartItems = await query('SELECT * FROM cart WHERE user_id = ?', [user_id]);
  
      if (cartItems.length === 0) {
        return res.status(400).json({ message: 'No items in cart' });
      }
  
      // Insert order into the orders table
      for (let item of cartItems) {
        const { prod_id, quantity, total, price } = item;
        await query(
          'INSERT INTO orders (prod_id, user_id, total, price) VALUES (?, ?, ?, ?)',
          [prod_id, user_id, total, price]
        );
      }
  
      // Optionally, clear the cart after placing the order
      await query('DELETE FROM cart WHERE user_id = ?', [user_id]);
  
      res.status(200).json({ message: 'Order placed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error placing order', error: err });
    }
  });