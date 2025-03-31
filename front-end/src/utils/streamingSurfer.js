import WaveSurfer from 'wavesurfer.js';

export const createStreamingWaveSurfer = (container, audioUrl) => {
    // Hủy instance cũ nếu tồn tại
    if (container.waveSurferInstance) {
        container.waveSurferInstance.destroy();
    }

    // Tạo instance mới
    const waveSurfer = WaveSurfer.create({
        container: container,
        waveColor: 'grey',
        progressColor: 'orange',
        cursorColor: 'transparent',
        barWidth: 2,
        barGap: 2,
        height: 40,
        backend: 'MediaElement', 
        mediaControls: false, 
    });

    // Load audio trực tiếp từ URL (streaming)
    waveSurfer.load(audioUrl);

    // Gán vào container để quản lý
    container.waveSurferInstance = waveSurfer;

    return waveSurfer;
};
