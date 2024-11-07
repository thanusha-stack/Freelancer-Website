import React, { createContext, useState, useContext } from "react";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileDataFreelancer, setProfileDataFreelancer] = useState({
    name: "",
    skill: "",
    description:"",
    experience: "",
    language:"",
    rate: "",
    emailID: "",
    location: "",
    country: "United States",
    phone: "",
    otp: "",
    dob:"",
    video:"",
    degree:"",
    certificate:"",
    resume:"",
  });

  return (
    <ProfileContext.Provider value={{ profileDataFreelancer, setProfileDataFreelancer }}>
      {children}
    </ProfileContext.Provider>
  );
};
