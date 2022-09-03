import React from "react";

function TabBar({ children, currentTab, onChange }) {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { currentTab, onChange });
    }
    return child;
  });

  return <div className="tabbar">
    {childrenWithProps}
  </div>
}

function TabBarItem({ label, icon, currentTab, onChange }) {
  return <button className={currentTab === label ? 'active' : ''} onClick={() => onChange(label)}>
    <img src={`images/${icon}-7.png`} alt={label} />
    <br />
    {label}
  </button>
}

TabBar.Item = TabBarItem

export default TabBar;
