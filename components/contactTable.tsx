import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useContacts } from "@/api/useContacts";
import TRow from "@/components/TableRow";
import Modal from "./messageModal";
import ConfirmModal from "./confirmModal";

type tableProps = {
  gender: string;
  fullname: string;
  email: string;
  phone: string;
  _id: string;
};

const contactTable = () => {
  const [contacts, setContacts] = useState<tableProps[]>([]);

  const [showModal, setShowModal] = useState({
    state: false,
    message: "",
    action: "",
  });
  const [selectedContact, setSelectedContact] = useState("");
  const [conffirmModal, setConfirmModal] = useState(false);

  const { getAll, deleteContact } = useContacts();

  const fetchContacts = async () => {
    try {
      const res = await getAll();
      if (res && res.status === "success") {
        setContacts(res.data.contacts);
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await deleteContact(selectedContact);
      if (res && res.status === 204) {
        setConfirmModal(false);
        setSelectedContact("");
        setShowModal({
          state: true,
          message: "Your contact has been deleted successfully!",
          action: "Okay",
        });
        fetchContacts();
      }
    } catch (error) {
      setShowModal({
        state: true,
        message: "Contact deletion failed!",
        action: "Okay",
      });
    }
  };

  const handleShowConfirmModal = (contactId: string) => {
    setSelectedContact(contactId);
    setConfirmModal(true);
  };

  return (
    <div
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="mt-5 bg-white rounded-3xl p-5 w-full  h-60 overflow-y-scroll overflow-x-scroll"
    >
      <table className="min-w-full table-auto">
        <Thead />
        <tbody>
          {contacts &&
            contacts.length > 0 &&
            contacts.map((contact) => (
              <TRow
                key={contact._id}
                fullname={contact.fullname}
                gender={contact.gender}
                phone={contact.phone}
                email={contact.email}
                _id={contact._id}
                setShowModal={setShowModal}
                handleDelete={() => handleShowConfirmModal(contact._id)}
              />
            ))}
          {/* {contacts && contacts.length === 0 && (
            <tr className="text-lg p-10 text-[#083F46]">
              <td>No contacts</td>
            </tr>
          )} */}
        </tbody>
      </table>
      {showModal && showModal.state && (
        <Modal
          action={showModal.action}
          message={showModal.message}
          onClick={() =>
            setShowModal({ state: false, message: "", action: "" })
          }
        ></Modal>
      )}

      {conffirmModal && (
        <ConfirmModal
          action="model"
          message="Are you sure you want to delete this contact?"
          onConfirm={handleDelete}
          onCancel={() => setConfirmModal(false)}
        ></ConfirmModal>
      )}
    </div>
  );
};

export default contactTable;

const Thead = () => {
  return (
    <thead>
      <tr className="">
        <th className="px-4 py-2 text-lg text-[#083F46] text-left"></th>
        <th className="px-4 py-2 text-lg text-[#083F46] text-left">fullname</th>
        <th className="px-4 py-2 text-lg text-[#083F46] text-left">gender</th>
        <th className="px-4 py-2 text-lg text-[#083F46] text-left">e-mail</th>
        <th className="px-4 py-2 text-lg text-[#083F46] text-left">
          phone number
        </th>
        <th className="px-4 py-2 text-lg text-[#083F46] text-left"></th>
      </tr>
    </thead>
  );
};
