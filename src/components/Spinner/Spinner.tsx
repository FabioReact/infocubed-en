import styles from './spinner.module.css'

const Spinner = () => {
	return (
		<div aria-label='spinner'>
			<span className={styles.loader}></span>
		</div>
	)
}

export default Spinner