
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { cs } from "date-fns/locale";

export const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-sm text-gray-600">
      <div className="font-medium">
        {format(currentTime, 'EEEE, d. MMMM yyyy', { locale: cs })}
      </div>
      <div className="text-lg font-bold text-blue-600">
        {format(currentTime, 'HH:mm:ss')}
      </div>
    </div>
  );
};
