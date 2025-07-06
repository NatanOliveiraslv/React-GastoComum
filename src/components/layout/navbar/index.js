import { Link } from 'react-router-dom';

import Container from '../container';
import styles from './NavBar.module.css';

const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src='/img/logo.png' alt="Icone" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">teste</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default NavBar;