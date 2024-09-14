import { TrophyIcon, OkIcon, LockIcon } from "./Icons"
import { useTranslation } from 'react-i18next'

export default function League({ number, level, league }) {
	const { t } = useTranslation()

	return (
		<div className={'league' + (level === league.levels[0].value || level === league.levels[1]?.value ? ' active' : level > league.levels[0].value ? ' passed' : '')}>
			<div className='left-side'>
				<TrophyIcon />
				<span className='name'>{t(`career.leagues.${number}`)} {t('career.league')}</span>
				<span className='levels'>({league.levels.map(level => 'K' + level.value).join(',')} {t('career.level')})</span>
			</div>
			{level >= league.levels[0].value ? <OkIcon /> : <LockIcon />}
		</div>
	)
}