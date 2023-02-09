import { Outlet, Link } from "react-router-dom";

export default function Home() {
    return(
        <>
            <div>
                <h1>Home Page</h1>
                <nav>
                    <ul>
                        {/* Link to allows us to update the URL without requesting another co from the server*/}
                        <li><Link to={`/pomo/`}> Pomodoro</Link></li>
                    </ul>
                    <ul>
                        <li><Link to={`/break/`}> Break</Link></li>
                    </ul>
                    <ul>
                        <li><Link to={`/test/`}> Broken Link</Link></li>
                    </ul>
                </nav>
            </div>
            <div>
                {/* This is where page components will load into*/}
                <Outlet />
            </div>
        </>
    )
}