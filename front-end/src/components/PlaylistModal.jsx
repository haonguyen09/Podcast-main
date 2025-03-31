import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { getAllPlaylist, updatePlaylist } from '../services/PlaylistService';
import { toast } from 'react-toastify';

const PlaylistModal = (props) => {
    const { showModal, handleClose, handleCreateNewPlaylist, userId, podcastId } = props;
    const [playlists, setPlaylists] = useState([]);

    const fetchPlaylists = async () => {
        try {
            const result = await getAllPlaylist();
            const filter = result.data.filter(item => item.userId._id === userId);
            setPlaylists(filter);
        } catch (error) {
            console.error('Error fetching playlists', error);
        }
    };

    useEffect(() => {
        if (showModal) {
            fetchPlaylists();
        }
    }, [showModal, userId, podcastId]);

    const handlePlaylist = async (id) => {
        try {
            await fetchPlaylists();
            const targetPlaylist = playlists.find(item => item._id === id);
            if (targetPlaylist) {
                const podcastIds = targetPlaylist.podcasts.map(podcast => podcast._id);
                const updatedPodcasts = [...podcastIds, podcastId];
                const response = await updatePlaylist(id, { podcasts: updatedPodcasts });
                if (response) {
                    toast.success("Add playlist successful!");
                } else {
                    toast.error("Add playlist failed!");
                }
            } else {
                console.error("Target playlist not found.");
            }
        } catch (error) {
            console.error("Error updating playlist", error);
        }
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Choose or Create Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {playlists.map(playlist => (
                        <ListGroup.Item key={playlist._id} onClick={() => handlePlaylist(playlist._id)} style={{ cursor: 'pointer' }}>
                            {playlist.title}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCreateNewPlaylist}>
                    Create New Playlist
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export {PlaylistModal};
