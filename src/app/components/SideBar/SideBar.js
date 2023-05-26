import React, { useState } from "react";
import "./SideBar.css";
import { MenuItems } from "./MenuItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const SideBar = () => {
	const [isExpanded, setExpendState] = useState(false);
	return (
		<div
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">

							<h2 className="intermediary-title">Intermediary</h2>
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() => setExpendState(!isExpanded)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>

				</div>
				<div className="nav-menu-user">
					{isExpanded && <h3 className="intermediary-subtitle"><FontAwesomeIcon className="user-icon" icon={faUser} />Hello, User !</h3>}
				</div>
				<div className="nav-menu-sidebar">
					{MenuItems.map(({ text, icon, iconStyle, path, key }) => (
						<Link
							key={key}
							to={path}
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							title={text}
						>
							{isExpanded ? <p><FontAwesomeIcon className={iconStyle} icon={icon} />{text}</p> :
								<FontAwesomeIcon className={iconStyle} icon={icon} />}
						</Link>
					))}

				</div>
			</div>
			<div className="nav-footer">
				<a
					className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
					href="/"
				>

					{isExpanded ? <p className="logout-icon"><FontAwesomeIcon className='icon-style' icon={faRightFromBracket} />LogOut</p> :
						<p className="logout-icon-NX"><FontAwesomeIcon className='icon-style' icon={faRightFromBracket} /></p>}
				</a>
			</div>
		</div>
	);
};

export default SideBar;