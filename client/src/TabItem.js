function TabItem({ children, visible }) {
  return <div className={visible ? 'tab' : 'tab hidden'}>
    {children}
  </div>
}

export default TabItem;