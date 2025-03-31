import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { printFile } from '../utils/printFile';
import { createPlaylist } from '../services/PlaylistService';
import { toast } from 'react-toastify';

const ModalCreatePlaylist = (props) => {
    const { showModal, handleClose, userId, podcastId } = props;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setImage(null);
        setImagePreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        printFile(file, setImagePreview);
    };

    const handleCreatePlaylist = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("userId", userId);
        formData.append("podcasts[0]", podcastId);

        const response = await createPlaylist(formData);
        if (response) {
            toast.success("Create playlist successful!");
        } else {
            toast.error("Create playlist failed!");
        }
        handleClose();
        resetForm();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formPlaylistName">
                        <Form.Label>New Playlist Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter playlist name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPlaylistDescription">
                        <Form.Label>Playlist Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter playlist description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPlaylistImage">
                        <Form.Label>Upload Image</Form.Label>
                        <input
                            className='width-full'
                            type='file'
                            id="custom-file"
                            label="Choose file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </Form.Group>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        </div>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCreatePlaylist}>
                    Create Playlist
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export { ModalCreatePlaylist };
