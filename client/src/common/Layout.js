import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { TabMenu } from 'primereact/tabmenu'

const Layout = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const items = [
        { label: 'Posts', icon: 'pi pi-book', command: () => navigate('/posts'), path: '/posts' },
        { label: 'Users', icon: 'pi pi-users', command: () => navigate('/users'), path: '/users' },
        { label: 'Tasks', icon: 'pi pi-list', command: () => navigate('/todos'), path: '/todos' }
    ];

    const activeIndex = items.findIndex(item => location.pathname.startsWith(item.path));

    return (
        <>
            <div className="layoutPage">
                <header>
                    <div className="card">
                        <TabMenu
                            model={items}
                            activeIndex={activeIndex >= 0 ? activeIndex : 0} 
                            style={{
                                width: '100%', fontSize: '16px', padding: '10px', borderRadius: '10px'
                            }}
                        />
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
                <footer> </footer>
            </div>
        </>
    )
}

export default Layout;
