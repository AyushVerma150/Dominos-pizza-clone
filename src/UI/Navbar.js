//lib imports
import React from 'react';
import { GiFullPizza } from 'react-icons/gi';

//style imports
import styles from 'UI/UI.module.css';

const Navbar = () =>
{

    //navbar at the top of the screen
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarBox}>
                <GiFullPizza className={styles.navbarLogo} />
                Pizza App
            </div>
            <ul className={styles.navbarLink}>
                <li className={styles.navbarLinkItem}>
                    Home
                </li>
                <li className={styles.navbarLinkItem}>
                    Menu
                </li>
                <li className={styles.navbarLinkItem}>
                    Login | Signup
                </li>
            </ul>
        </nav>
    );
};


export default Navbar;