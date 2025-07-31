import { useState } from 'react';
import Account from '../Account';

const ManageAccount = () => {
  // Assume you fetch user data from context or API
  const user = { firstName: "John", lastName: "Doe" };

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const handleSaveChanges = () => {
    // TODO: Send updated name to backend
    console.log("Saving changes:", { firstName, lastName });
  };

  const handleDeleteAccount = () => {
    // TODO: Confirm and call backend to delete account
    if(window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deleted");
    }
  };

  return (
    <Account>
      <div className="manage__account__container">
        <div className="edit__account__container">
          <div className="edit__account">
            <div className="edit__account__header">Edit account</div>
            <div className="edit__account__form__container">
              <div className="edit__account__form">
                <div className="fname__input__container edit__input__container">
                  <label className="fname__label input__label">First name</label>
                  <input
                    type="text"
                    className="fname__input edit__account__input"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </div>
                <div className="lname__input__container edit__input__container">
                  <label className="lname__label input__label">Last name</label>
                  <input
                    type="text"
                    className="lname__input edit__account__input"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </div>
                <div className="save__changes__button__container">
                  <button
                    className="save__changes__button"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="separator__line"></div>

        <div className="delete_account__container">
          <div className="delete__account">
            <div className="delete__account__header">Delete account</div>
            <div className="delete__account__prompt">
              Do you want to cancel subscription?
            </div>
            <div className="delete__account__button__container">
              <button
                className="delete__account__button"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </Account>
  );
};

export default ManageAccount;
