function submitMessage() {
    const name = document.getElementById('senderName').value.trim();
    const text = document.getElementById('messageText').value.trim();
    const preview = document.getElementById('messagePreview');

    if (!name || !text) {
        return false;
    }

    preview.innerHTML = `<strong>${escapeHtml(name)}</strong> vừa gửi:<p>${escapeHtml(text).replace(/\n/g, '<br>')}</p>`;
    preview.style.display = 'block';
    document.getElementById('senderName').value = '';
    document.getElementById('messageText').value = '';

    // Gửi tin nhắn đến Telegram
    sendToTelegram(name, text);

    return false;
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sendToTelegram(name, message) {
    const now = new Date();
    const timeString = now.toLocaleString('vi-VN'); // Thời gian theo định dạng Việt Nam
    const url = `https://api.telegram.org/bot8789671383:AAEY-rhWA4Urt7B7LN5t6C6uTZB8xrs91qw/sendMessage`;
    const data = {
        chat_id: 8622262309,
        text: `🌐 Nguồn: Trang web Digital Profile\n👤 Người gửi: ${name}\n💬 Lời nhắn: ${message}\n🕒 Thời gian: ${timeString}`,
        parse_mode: 'HTML'
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Tin nhắn đã gửi thành công đến Telegram');
        } else {
            console.error('Lỗi gửi tin nhắn:', data.description);
        }
    })
    .catch(error => {
        console.error('Lỗi kết nối:', error);
    });
}

function launchConfetti() {
    confetti({
        particleCount: 180,
        spread: 120,
        startVelocity: 50,
        ticks: 120,
        origin: { y: 0.4 },
        gravity: 0.8,
        scalar: 1.1,
        colors: ['#FF6B6B', '#FFD93D', '#5DD39E', '#4D96FF', '#B049FF']
    });

    setTimeout(() => {
        confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.2 },
            scalar: 0.9,
            colors: ['#FFD93D', '#FF6B6B', '#4D96FF']
        });
    }, 250);
}

const gameState = {
    score: 0,
    time: 20,
    active: false,
    intervalId: null,
    target: null,
    colors: ['Xanh', 'Đỏ', 'Vàng', 'Tím', 'Xanh lá', 'Cam']
};

function createGameTiles() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';

    for (let i = 0; i < 6; i++) {
        const tile = document.createElement('button');
        tile.type = 'button';
        tile.className = 'game-tile';
        tile.dataset.index = i;
        tile.addEventListener('click', () => handleTileClick(i));
        board.appendChild(tile);
    }
}

function startGame() {
    if (gameState.active) return;

    gameState.score = 0;
    gameState.time = 20;
    gameState.active = true;
    document.getElementById('gameScore').textContent = gameState.score;
    document.getElementById('gameTime').textContent = gameState.time;
    document.getElementById('gameMessage').textContent = 'Game đã bắt đầu!';

    setNextTarget();

    gameState.intervalId = setInterval(() => {
        gameState.time -= 1;
        document.getElementById('gameTime').textContent = gameState.time;

        if (gameState.time <= 0) {
            endGame();
        }
    }, 1000);
}

function resetGame() {
    clearInterval(gameState.intervalId);
    gameState.active = false;
    gameState.score = 0;
    gameState.time = 20;
    document.getElementById('gameScore').textContent = gameState.score;
    document.getElementById('gameTime').textContent = gameState.time;
    document.getElementById('gameTarget').textContent = '...';
    document.getElementById('gameMessage').textContent = 'Nhấn Bắt đầu để chơi!';
    createGameTiles();
}

function setNextTarget() {
    const colors = [...gameState.colors];
    const targetIndex = Math.floor(Math.random() * colors.length);
    gameState.target = colors[targetIndex];
    document.getElementById('gameTarget').textContent = gameState.target;

    const tiles = document.querySelectorAll('.game-tile');
    const shuffled = shuffleArray(colors);
    tiles.forEach((tile, index) => {
        tile.textContent = shuffled[index];
        tile.disabled = false;
    });
}

function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function handleTileClick(index) {
    if (!gameState.active) return;

    const tiles = document.querySelectorAll('.game-tile');
    const selected = tiles[index];
    const selectedColor = selected ? selected.textContent : '';
    const message = document.getElementById('gameMessage');

    if (selectedColor === gameState.target) {
        gameState.score += 1;
        message.textContent = 'Chính xác! +1 điểm.';
        selected.classList.add('active');
        if (gameState.score > 0 && gameState.score % 5 === 0) {
            launchConfetti();
        }
    } else {
        message.textContent = 'Sai rồi, thử lại.';
        selected.classList.add('wrong');
        setTimeout(() => {
            selected.classList.remove('wrong');
        }, 300);
    }

    document.getElementById('gameScore').textContent = gameState.score;
    setNextTarget();
}

function endGame() {
    clearInterval(gameState.intervalId);
    gameState.active = false;
    document.getElementById('gameMessage').textContent = `Kết thúc! Điểm của bạn: ${gameState.score}`;
    document.querySelectorAll('.game-tile').forEach(tile => {
        tile.disabled = true;
    });
}

function endGame() {
    clearInterval(gameState.intervalId);
    gameState.active = false;
    document.getElementById('gameMessage').textContent = `Kết thúc! Điểm của bạn: ${gameState.score}`;
    highlightTile(-1);
}

function copyShareLink() {
    const shareInput = document.getElementById('shareLink');
    if (!shareInput) return;

    shareInput.select();
    shareInput.setSelectionRange(0, 99999);

    try {
        document.execCommand('copy');
        alert('Link đã được sao chép. Bạn có thể gửi cho bạn bè!');
    } catch (err) {
        console.error('Lỗi sao chép link:', err);
        alert('Không thể sao chép link. Vui lòng sao chép thủ công.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const shareInput = document.getElementById('shareLink');
    if (shareInput) {
        shareInput.value = window.location.href;
    }
    createGameTiles();
    resetGame();
});
