import styles from './TagDisplay.module.css'

function TagDisplay({ tags }) {
  return (
    <div className={styles.tagSection}>
      {tags.map((tag, index) => (
        <p className={styles.tag} key={index}>
          #{tag}
        </p>
      ))}
    </div>
  )
}

export default TagDisplay
