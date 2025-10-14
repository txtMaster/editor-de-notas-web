import React, { useEffect, useState } from "react";
import s from "./ProfileSection.module.css";
import ProfileIcon from "../../assets/svg/profile.svg?react";
import type { BasicComponent } from "../../types/BasicComponent";
import { useAuth } from "../../context/useAuth";
import type { Profile } from "../../context/AuthContext";

type Props = BasicComponent & {};

export const ProfileSection: React.FC<Props> = ({ className = "" }) => {
	const { profile, logout } = useAuth();

	const [editProfile, setEditProfile] = useState<Profile>(profile);

	useEffect(() => setEditProfile(profile), [profile]);

	const onCangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		if (!editProfile) return;
		const { value, name } = target;
		if (name === "name") setEditProfile({ ...editProfile, name: value });
		else if (name === "email") setEditProfile({ ...editProfile, email: value });
	};

	const [hide, setHide] = useState<boolean>(true);
	return (
		<div className={`profile ${s.root} ${className}`}>
			<div className="title">Profile</div>
			<ProfileIcon className="icon" />
			<label>
				Name:
				<input
					type="text"
					name="name"
					value={editProfile?.name}
					onChange={onCangeInput}
				/>
			</label>
			<label>
				Email:
				<input
					type="text"
					name="email"
					value={editProfile?.email}
					onChange={onCangeInput}
				/>
			</label>
			<label htmlFor="password">
				Change password:
				<form className="password-wrap">
					<input
						type={hide ? "password" : "text"}
						name="password"
						autoComplete={"true"}
					/>
					<button type="button" onClick={() => setHide((is) => !is)}>
						{hide ? "show" : "hide"}
					</button>
				</form>
			</label>
			<button type="button">Reset pass</button>
			<button onClick={() => logout()}>Logout</button>
		</div>
	);
};
