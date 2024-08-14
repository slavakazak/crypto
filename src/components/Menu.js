import { NavLink } from 'react-router-dom'

export default function Menu() {
	return (
		<div className="menu">
			<NavLink className="menu-item menu-workshop" to="/workshop" activeClassName="active">
				<div className='icon-container'>
					<svg width="27" height="27" viewBox="0 0 27 27" fill="none"><path d="M2.56799 12.122L4.12569 5.37203C4.24348 4.86159 4.69801 4.5 5.22188 4.5H7.64445C8.34886 4.5 8.88001 5.13999 8.75019 5.83233L7.48457 12.5823C7.38479 13.1145 6.9202 13.5 6.37883 13.5H3.66418C2.94071 13.5 2.40532 12.827 2.56799 12.122Z" stroke-linecap="round" stroke-linejoin="round" /><path d="M24.432 12.122L22.8743 5.37203C22.7565 4.86159 22.302 4.5 21.7781 4.5H19.3555C18.6512 4.5 18.12 5.13999 18.2499 5.83233L19.5155 12.5823C19.6152 13.1145 20.0798 13.5 20.6211 13.5H23.3358C24.0593 13.5 24.5946 12.827 24.432 12.122Z" stroke-linecap="round" stroke-linejoin="round" /><path d="M7.59766 12.1436L9.01669 5.39355C9.12617 4.87281 9.5855 4.5 10.1176 4.5H12.375C12.9963 4.5 13.5 5.00368 13.5 5.625V12.375C13.5 12.9963 12.9963 13.5 12.375 13.5H8.6986C7.98416 13.5 7.45068 12.8427 7.59766 12.1436Z" stroke-linecap="round" stroke-linejoin="round" /><path d="M19.4023 12.1436L17.9833 5.39355C17.8738 4.87281 17.4144 4.5 16.8824 4.5H14.625C14.0037 4.5 13.5 5.00368 13.5 5.625V12.375C13.5 12.9963 14.0037 13.5 14.625 13.5H18.3014C19.0159 13.5 19.5494 12.8427 19.4023 12.1436Z" stroke-linecap="round" stroke-linejoin="round" /><path d="M5.625 13.5V21.375C5.625 21.9963 6.12868 22.5 6.75 22.5H20.25C20.8713 22.5 21.375 21.9963 21.375 21.375V13.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M11.25 21.9375V19.125C11.25 18.5037 11.7537 18 12.375 18H14.625C15.2463 18 15.75 18.5037 15.75 19.125V21.9375" stroke-linecap="round" stroke-linejoin="round" /></svg>
				</div>
				<div className="label">Мастерская</div>
			</NavLink>
			<NavLink className="menu-item menu-task" to="/task" activeClassName="active">
				<div className='icon-container'>
					<svg width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M7.34935 0H0V6.99706H7.34935V0Z" /><path d="M17 0H9.65066V6.99706H17V0Z" /><path d="M7.34935 9.00294H0V16H7.34935V9.00294Z" /><path d="M17 9.00294H9.65066V16H17V9.00294Z" /></svg>
				</div>
				<div className="label">Задания</div>
			</NavLink>
			<NavLink className="menu-item menu-home" to="/" activeClassName="active">
				<div className='icon-container'>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0_2_54)"><path d="M12 6.30579L3.44052 13.3622C3.44052 13.3721 3.43802 13.3868 3.43301 13.4068C3.42811 13.4266 3.4255 13.441 3.4255 13.4512V20.5965C3.4255 20.8545 3.51982 21.0781 3.70842 21.2664C3.89695 21.4548 4.12022 21.5496 4.37826 21.5496H10.0944V15.8331H13.9057V21.5498H19.6217C19.8797 21.5498 20.1033 21.4552 20.2916 21.2664C20.4802 21.0783 20.5748 20.8546 20.5748 20.5965V13.4512C20.5748 13.4116 20.5694 13.3816 20.5598 13.3622L12 6.30579Z" /><path d="M23.8344 11.7544L20.5745 9.04509V2.97143C20.5745 2.83258 20.5299 2.71839 20.4403 2.62902C20.3514 2.53976 20.2373 2.49513 20.0981 2.49513H17.24C17.101 2.49513 16.9868 2.53976 16.8974 2.62902C16.8082 2.71839 16.7636 2.83263 16.7636 2.97143V5.87423L13.1314 2.83732C12.8142 2.57928 12.437 2.45029 12.0003 2.45029C11.5636 2.45029 11.1865 2.57928 10.869 2.83732L0.165389 11.7544C0.0661663 11.8337 0.0117841 11.9403 0.00166894 12.0743C-0.00839411 12.2082 0.0262791 12.3252 0.105793 12.4244L1.02873 13.526C1.10824 13.6152 1.21231 13.6698 1.34136 13.6898C1.4605 13.6998 1.57964 13.665 1.69878 13.5856L12 4.99593L22.3013 13.5856C22.3809 13.6548 22.4849 13.6894 22.614 13.6894H22.6587C22.7875 13.6698 22.8914 13.6148 22.9713 13.5258L23.8944 12.4243C23.9737 12.3249 24.0085 12.2082 23.9982 12.0741C23.988 11.9405 23.9334 11.8338 23.8344 11.7544Z" /></g><defs><clipPath id="clip0_2_54"><rect width="24" height="24" fill="white" /></clipPath></defs></svg>
				</div>
				<div className="label">Дом</div>
			</NavLink>
			<NavLink className="menu-item menu-invite" to="/invite" activeClassName="active">
				<div className='icon-container'>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z" /></svg>
				</div>
				<div className="label">Пригласить</div>
			</NavLink>
			<NavLink className="menu-item menu-rating" to="/rating" activeClassName="active">
				<div className='icon-container'>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M2.00015 18.4142L9.00015 11.4142L14.0002 16.4142L21.0002 9.41421V15H23.0002V6H14.0002V8H19.5859L14.0002 13.5858L9.00015 8.58579L0.585938 17L2.00015 18.4142Z" /></svg>
				</div>
				<div className="label">Рейтинг</div>
			</NavLink>
		</div>
	)
}