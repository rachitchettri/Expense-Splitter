import { useMemo, useState } from "react";

const roomTypes = ["Trip", "Birthday", "Office Party", "Wedding", "Other"];

export default function RoomPlanner() {
  const [rooms, setRooms] = useState([]);
  const [roomForm, setRoomForm] = useState({
    name: "",
    category: roomTypes[0],
    goalAmount: "",
  });
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [memberForm, setMemberForm] = useState({ name: "", amount: "" });

  const activeRoom = useMemo(
    () => rooms.find((room) => room.id === activeRoomId) || null,
    [rooms, activeRoomId]
  );

  const createRoom = (e) => {
    e.preventDefault();
    if (!roomForm.name.trim() || Number(roomForm.goalAmount) <= 0) return;

    const newRoom = {
      id: crypto.randomUUID(),
      name: roomForm.name.trim(),
      category: roomForm.category,
      goalAmount: Number(roomForm.goalAmount),
      members: [],
    };

    setRooms((prev) => [newRoom, ...prev]);
    setActiveRoomId(newRoom.id);
    setRoomForm({ name: "", category: roomTypes[0], goalAmount: "" });
  };

  const addMemberContribution = (e) => {
    e.preventDefault();
    if (!activeRoom) return;

    const amount = Number(memberForm.amount);
    if (!memberForm.name.trim() || amount <= 0) return;

    setRooms((prev) =>
      prev.map((room) =>
        room.id === activeRoom.id
          ? {
              ...room,
              members: [
                ...room.members,
                {
                  id: crypto.randomUUID(),
                  name: memberForm.name.trim(),
                  amount,
                },
              ],
            }
          : room
      )
    );

    setMemberForm({ name: "", amount: "" });
  };

  const totalRaised = activeRoom
    ? activeRoom.members.reduce((sum, member) => sum + member.amount, 0)
    : 0;
  const progress = activeRoom
    ? Math.min((totalRaised / activeRoom.goalAmount) * 100, 100)
    : 0;

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Create Planning Room</h2>
        <p className="text-gray-600 mb-4">
          Create a room, set a target budget, and let each member add their contribution.
        </p>

        <form onSubmit={createRoom} className="grid gap-3 md:grid-cols-4">
          <input
            value={roomForm.name}
            onChange={(e) => setRoomForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Room name (e.g., Goa Trip)"
            className="border rounded-lg px-3 py-2"
            required
          />
          <select
            value={roomForm.category}
            onChange={(e) => setRoomForm((prev) => ({ ...prev, category: e.target.value }))}
            className="border rounded-lg px-3 py-2"
          >
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            value={roomForm.goalAmount}
            onChange={(e) =>
              setRoomForm((prev) => ({ ...prev, goalAmount: e.target.value }))
            }
            type="number"
            min="1"
            placeholder="Target amount"
            className="border rounded-lg px-3 py-2"
            required
          />
          <button className="bg-[#3b5323] text-white rounded-lg px-4 py-2">Create Room</button>
        </form>
      </section>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow lg:col-span-1 space-y-3">
          <h3 className="text-xl font-semibold">Rooms</h3>
          {rooms.length === 0 ? (
            <p className="text-gray-500 text-sm">No room yet. Create your first event room.</p>
          ) : (
            rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                className={`w-full text-left border rounded-lg px-3 py-2 ${
                  activeRoomId === room.id ? "bg-[#6b8e23] text-white" : "bg-white"
                }`}
              >
                <p className="font-semibold">{room.name}</p>
                <p className="text-xs opacity-80">{room.category}</p>
              </button>
            ))
          )}
        </div>

        <div className="bg-white p-4 rounded-xl shadow lg:col-span-2 space-y-4">
          {!activeRoom ? (
            <p className="text-gray-600">Select a room to add people and contributions.</p>
          ) : (
            <>
              <div>
                <h3 className="text-xl font-semibold">{activeRoom.name}</h3>
                <p className="text-gray-500 text-sm">Type: {activeRoom.category}</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Raised: ₹{totalRaised}</span>
                  <span>Goal: ₹{activeRoom.goalAmount}</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-700" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <form onSubmit={addMemberContribution} className="grid md:grid-cols-3 gap-3">
                <input
                  value={memberForm.name}
                  onChange={(e) => setMemberForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Member name"
                  className="border rounded-lg px-3 py-2"
                  required
                />
                <input
                  value={memberForm.amount}
                  onChange={(e) => setMemberForm((prev) => ({ ...prev, amount: e.target.value }))}
                  type="number"
                  min="1"
                  placeholder="Contribution"
                  className="border rounded-lg px-3 py-2"
                  required
                />
                <button className="bg-[#556b2f] text-white rounded-lg px-4 py-2">
                  Add Contribution
                </button>
              </form>

              <div className="space-y-2">
                {activeRoom.members.length === 0 ? (
                  <p className="text-gray-500 text-sm">No contributions added yet.</p>
                ) : (
                  activeRoom.members.map((member) => (
                    <div key={member.id} className="border rounded-lg p-3 flex justify-between">
                      <span>{member.name}</span>
                      <span className="font-semibold">₹{member.amount}</span>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
