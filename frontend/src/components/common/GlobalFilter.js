import { useTranslate } from '../../context/TranslationContext';
function GlobalFilter({ globalFilter, setGlobalFilter }) {

  const t = useTranslate();

    return (
      <span>
        <input
          value={globalFilter || ''}
          onChange={e => setGlobalFilter(e.target.value || undefined)}
          placeholder={t('search_placeholder')}
          className="form-control"
        />
      </span>
    );
  }

  export default GlobalFilter;