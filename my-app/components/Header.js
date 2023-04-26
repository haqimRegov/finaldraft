import styles from "../styles/Home.module.css"
//import Image from "../../images/watermark.png";
import Link from "next/link";

const Header = () => {

	return (
		<div className={styles.headcontainer}>
			<div className={styles.headwrapper}>
				<div className={styles.title}>
					<h2>
						Hello, <span>TESTONE</span>
					</h2>
					<p>welcome to the dashboard.</p>
				</div>
			</div>
		</div>
	);
}

export default Header;