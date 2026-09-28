import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activities, syncActivities }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  async function handleDelete(id) {
    setError(null);
    try {
      await deleteActivity(token, id);
      await syncActivities();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      {error && <p role="alert">{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}
            {token && (
              <button onClick={() => handleDelete(activity.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
