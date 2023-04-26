import styles from "../styles/Home.module.css"
import Link from "next/link";
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
//import {faBookOpen} from "@fortawesome/free-solid-svg-icons"

const Navbar = () => {
    return(
        <div className={styles.navcontainer}>
            <div className={styles.logo}>
                <h2>Streamline</h2>
            </div>
            <div className={styles.wrapper}>
                <ul>
                    <li>
                        <Link href="/home">Home</Link>
                    </li>
                    <li>
                        <Link href="/temperature">Temperature</Link>
                    </li>
                    <li>
                        <Link href="/flow">Water Flow</Link>
                    </li>
                    <li>
                        <Link href="/turbidity">Turbidity</Link>
                    </li>
                    <li>
                        <Link href="/ph">pH</Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Navbar;