import styles from './panel-page.module.css';

type PanelPageProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function PanelPage({ title, description, children }: PanelPageProps) {
  return (
    <section className={styles.panelPage}>
      <header className={styles.panelHeader}>
        <p className={styles.kicker}>Workspace</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      {children ? <div className={styles.panelBody}>{children}</div> : null}
    </section>
  );
}
