import React, { useState } from "react";

/*
 Food order panel:
  - choose a booked seat from list (only booked seats)
  - choose menu items with qty
  - submit -> saves order per seat
*/

export default function FoodOrder({ menu, bookedSeats, foodOrders, onPlaceOrder }) {
  const bookedSeatIds = Object.keys(bookedSeats);

  const [activeSeat, setActiveSeat] = useState(bookedSeatIds[0] || "");
  const [cart, setCart] = useState(() => ({}));

  // sync active seat when bookings change
  React.useEffect(() => {
    if (bookedSeatIds.length && !activeSeat) setActiveSeat(bookedSeatIds[0]);
    if (!bookedSeatIds.length) setActiveSeat("");
  }, [bookedSeatIds, activeSeat]);

  React.useEffect(() => {
    // when selecting a different seat, load its existing order into cart
    if (activeSeat && foodOrders[activeSeat]) {
      const map = {};
      foodOrders[activeSeat].forEach(item => map[item.itemId] = item.qty);
      setCart(map);
    } else {
      setCart({});
    }
  }, [activeSeat, foodOrders]);

  function changeQty(itemId, delta) {
    setCart(prev => {
      const next = { ...prev };
      next[itemId] = Math.max(0, (next[itemId] || 0) + delta);
      if (next[itemId] === 0) delete next[itemId];
      return next;
    });
  }

  function submitOrder() {
    if (!activeSeat) {
      alert("Choose a booked seat to send food.");
      return;
    }
    const items = Object.entries(cart).map(([itemId, qty]) => ({ itemId, qty }));
    onPlaceOrder(activeSeat, items);
    alert("Food order placed for " + activeSeat);
  }

  function seatLabel(id) {
    const b = bookedSeats[id];
    return `${id} (${b.gender})`;
  }

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menu.find(m => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  return (
    <div className="card foodcard">
      <h2>Canteen - Order Food</h2>

      {bookedSeatIds.length === 0 ? (
        <div className="muted">No booked seats yet — book a seat first to order food.</div>
      ) : (
        <>
          <label>
            Deliver to seat:
            <select value={activeSeat} onChange={(e) => setActiveSeat(e.target.value)}>
              {bookedSeatIds.map(s => <option key={s} value={s}>{seatLabel(s)}</option>)}
            </select>
          </label>

          <div className="menu-list">
            {menu.map(item => (
              <div className="menu-row" key={item.id}>
                <div className="menu-left">
                  <div className="menu-name">{item.name}</div>
                  <div className="menu-price">₹{item.price}</div>
                </div>

                <div className="menu-controls">
                  <button onClick={() => changeQty(item.id, -1)}>-</button>
                  <span className="qty">{cart[item.id] || 0}</span>
                  <button onClick={() => changeQty(item.id, +1)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <div>Total: ₹{total}</div>
            <button className="btn btn-dark" onClick={submitOrder}>Place Food Order</button>
          </div>

          {foodOrders && activeSeat && foodOrders[activeSeat] && foodOrders[activeSeat].length > 0 && (
            <div className="existing-order">
              <h4>Existing order for {activeSeat}</h4>
              <ul>
                {foodOrders[activeSeat].map(it => {
                  const mi = menu.find(m => m.id === it.itemId);
                  return <li key={it.itemId}>{mi?.name || it.itemId} x {it.qty}</li>;
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
