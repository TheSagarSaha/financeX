import React from "react";

class home extends React.Component {
    render() {
        return (
            <div className="home">
              <h1>This is working currently. </h1>
              <form method="POST" type="submit">
                <input type="text" placeholder="Enter your name" />
                <button type="submit">Submit</button>
              </form>
            </div>
          );
    }
}

export default home;
