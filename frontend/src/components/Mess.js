import React from "react";

const Mess = ({ message, show }) => {

  if (!show) return null;

  return (<>
      <div className="popup">
        {message}
      </div>
  </>
  );
};


export default Mess;
