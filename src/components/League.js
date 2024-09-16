import { TrophyIcon, OkIcon, LockIcon } from "./Icons"
import { useTranslation } from 'react-i18next'

export default function League({ number, level, league }) {
	const { t } = useTranslation()

	return (
		<div className={'league' + (league.includes(level) ? ' active' : level > league[0] ? ' passed' : '')}>
			<div className='left-side'>
				<TrophyIcon />
				<span className='name'>{t(`career.leagues.${number}`)} {t('career.league')}</span>
				<span className='levels'>({league.map(level => 'K' + level).join(',')} {t('career.level')})</span>
			</div>
			{level >= league[0] ? <OkIcon /> : <LockIcon />}
		</div>
	)
}