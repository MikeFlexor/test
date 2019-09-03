const app = new PIXI.Application({ transparent: true });
document.body.appendChild(app.view);

VK.init(function() { }, function() { }, '5.101');

////////// ЗАГРУЗКА ФАЙЛА АТЛАСА ТЕКСТУР //////////////////////////////
app.loader.add('atlas', 'https://raw.githubusercontent.com/MikeFlexor/mikeflexor.github.io/master/atlas/atlas.json');
app.loader.load(setup);

function setup() {
	let onlineFriendsNames = [];
	let onlineFriendsPhotos = [];
	let onlineFriendsID = [];
	let offlineFriendsNames = [];
	let offlineFriendsPhotos = [];
	let offlineFriendsID = [];
	let friendNames = [];
	let friendPhotos = [];
	let showFriendsPosition = 0;
	let friendChecked = [];
	let selectFirstTab = true;

	////////// ЗАГРУЗКА ТЕКСТУР ИЗ АТЛАСА //////////////////////////////
	const bg_big_purple = PIXI.Texture.fromFrame('bg_big_purple.png');
	const bg_big_purple_board_gift = PIXI.Texture.fromFrame('bg_big_purple_board_gift.png');
	const bg_big_purple_title = PIXI.Texture.fromFrame('bg_big_purple_title.png');
	const btn_purple_norm_dis = PIXI.Texture.fromFrame('btn_purple_norm_dis.png');
	const btn_purple_norm_en = PIXI.Texture.fromFrame('btn_purple_norm_en.png');
	const btn_purple_over_dis = PIXI.Texture.fromFrame('btn_purple_over_dis.png');
	const btn_purple_over_en = PIXI.Texture.fromFrame('btn_purple_over_en.png');
	const checkbox_norm = PIXI.Texture.fromFrame('checkbox_norm.png');
	const checkbox_over = PIXI.Texture.fromFrame('checkbox_over.png');
	const chek = PIXI.Texture.fromFrame('chek.png');
	const friend_board = PIXI.Texture.fromFrame('friend_board.png');
	const friend_frame = PIXI.Texture.fromFrame('friend_frame.png');
	const friend_frame_empty = PIXI.Texture.fromFrame('friend_frame_empty.png');
	const WIN_btn_arrow_norm = PIXI.Texture.fromFrame('WIN_btn_arrow_norm.png');
	const WIN_btn_arrow_over = PIXI.Texture.fromFrame('WIN_btn_arrow_over.png');
	const WIN_btn_close_norm = PIXI.Texture.fromFrame('WIN_btn_close_norm.png');
	const WIN_btn_close_over = PIXI.Texture.fromFrame('WIN_btn_close_over.png');
	const WIN_btn_green_norm = PIXI.Texture.fromFrame('WIN_btn_green_norm.png');
	const WIN_btn_green_over = PIXI.Texture.fromFrame('WIN_btn_green_over.png');
	const WIN_gift_mouseB = PIXI.Texture.fromFrame('WIN_gift_mouseB.png');
	const WIN_gift_mouseW = PIXI.Texture.fromFrame('WIN_gift_mouseW.png');

	////////// ТЕКСТОВЫЕ СТИЛИ //////////////////////////////
	let textStyle1 = new PIXI.TextStyle({
		fontFamily: 'Tahoma',
		fontSize: 27,
		fontWeight: 'bolder',
		align: 'center',
		fill: ['#5A2F69'],
		stroke: '#FFFFFF',
		strokeThickness: 5,
		dropShadow: true,
		dropShadowColor: '#835D68',
		dropShadowBlur: 2,
		dropShadowAngle: Math.PI * 1.5,
		dropShadowDistance: 3,
		lineJoin: 'round',
		lineHeight: 31
	});
	let textStyle2 = new PIXI.TextStyle({
		fontFamily: 'Tahoma',
		fontSize: 22,
		fontWeight: 'bold',
		align: 'center',
		fill: ['#FFFFFF'],
		stroke: '#1C681C',
		strokeThickness: 4,
		dropShadow: true,
		dropShadowColor: '#1C681C',
		dropShadowBlur: 2,
		dropShadowAngle: Math.PI * 0.5,
		dropShadowDistance: 1,
		lineJoin: 'round',
	});
	let textStyle3 = new PIXI.TextStyle({
		fontFamily: 'Tahoma',
		fontSize: 18,
		fontWeight: 'bold',
		align: 'center',
		fill: ['#EBE59F'],
		stroke: '#654371',
		strokeThickness: 3,
		lineJoin: 'round',
	});
	let textStyle4 = new PIXI.TextStyle({
		fontFamily: 'Tahoma',
		fontSize: 15,
		fontWeight: 'bolder',
		align: 'center',
		fill: ['#401D4C'],
		lineJoin: 'round',
	});

	////////// ФОНОВАЯ КАРТИНКА ОКНА //////////////////////////////
	let imageBackground = new PIXI.Sprite(bg_big_purple);
	imageBackground.x = 25;
	imageBackground.y = 20;
	app.stage.addChild(imageBackground);

	////////// КНОПКА ПЕРВОЙ ВКЛАДКИ //////////////////////////////
	let buttonTab1 = new PIXI.Sprite(btn_purple_norm_en);
	buttonTab1.x = 100;
	buttonTab1.y = 169;
	buttonTab1.interactive = true;
	buttonTab1.on('pointerover', onButtonTab1Over);
	buttonTab1.on('pointerout', onButtonTab1Out);
	buttonTab1.on('pointerdown', onButtonTab1Down);
	app.stage.addChild(buttonTab1);
	function onButtonTab1Over() {
		if (selectFirstTab) this.texture = btn_purple_over_en;
		else this.texture = btn_purple_over_dis;
	}
	function onButtonTab1Out() {
		if (selectFirstTab) this.texture = btn_purple_norm_en;
		else this.texture = btn_purple_norm_dis;
	}
	function onButtonTab1Down() {
		selectFirstTab = true;
		buttonTab1.texture = btn_purple_over_en;
		buttonTab2.texture = btn_purple_norm_dis;
		VK.api("friends.search", {count: 1000, fields: 'photo_50, online'}, function (data) {
			getFriendsInfo(data.response);
		});
		showFriendsPosition = 0;
		drawFriends();
		friendChecked = [];
		friendChecked.length = offlineFriendsNames.length;
		drawChecks();
	}

	////////// КНОПКА ВТОРОЙ ВКЛАДКИ //////////////////////////////
	let buttonTab2 = new PIXI.Sprite(btn_purple_norm_dis);
	buttonTab2.x = 314;
	buttonTab2.y = 169;
	buttonTab2.interactive = true;
	buttonTab2.on('pointerover', onbuttonTab2Over);
	buttonTab2.on('pointerout', onbuttonTab2Out);
	buttonTab2.on('pointerdown', onButtonTab2Down);
	app.stage.addChild(buttonTab2);
	function onbuttonTab2Over() {
		if (selectFirstTab) this.texture = btn_purple_over_dis;
		else this.texture = btn_purple_over_en;
	}
	function onbuttonTab2Out() {
		if (selectFirstTab) this.texture = btn_purple_norm_dis;
		else this.texture = btn_purple_norm_en;
	}
	function onButtonTab2Down() {
		selectFirstTab = false;
		buttonTab1.texture = btn_purple_norm_dis;
		buttonTab2.texture = btn_purple_over_en;
		VK.api("friends.search", {count: 1000, fields: 'photo_50, online'}, function (data) {
			getFriendsInfo(data.response);
		});
		showFriendsPosition = 0;
		drawFriends();
		friendChecked = [];
		friendChecked.length = offlineFriendsNames.length;
		drawChecks();
	}

	////////// КАРТИНКА ПОЛЯ ВКЛАДОК //////////////////////////////
	let imageBoardGift = new PIXI.Sprite(bg_big_purple_board_gift);
	imageBoardGift.x = 78;
	imageBoardGift.y = 203;
	app.stage.addChild(imageBoardGift);

	////////// КАРТИНКА ТИТУЛЬНОГО ПОЛЯ //////////////////////////////
	let imageTitle = new PIXI.Sprite(bg_big_purple_title);
	imageTitle.x = 250;
	imageTitle.y = 26;
	app.stage.addChild(imageTitle);

	////////// КАРТИНКА МЫШИ B //////////////////////////////
	let imageMouseB = new PIXI.Sprite(WIN_gift_mouseB);
	imageMouseB.x = 0;
	imageMouseB.y = 364;
	app.stage.addChild(imageMouseB);

	////////// КАРТИНКА МЫШИ W //////////////////////////////
	let imageMouseW = new PIXI.Sprite(WIN_gift_mouseW);
	imageMouseW.x = 489;
	imageMouseW.y = 0;
	app.stage.addChild(imageMouseW);

	////////// КНОПКА ОТПРАВИТЬ //////////////////////////////
	let buttonSend = new PIXI.Sprite(WIN_btn_green_norm);
	buttonSend.x = 300;
	buttonSend.y = 524;
	buttonSend.interactive = true;
	buttonSend.on('pointerover', onButtonSendOver);
	buttonSend.on('pointerout', onButtonSendOut);
	app.stage.addChild(buttonSend);
	function onButtonSendOver() {
		this.texture = WIN_btn_green_over;
	}
	function onButtonSendOut() {
		this.texture = WIN_btn_green_norm;
	}

	////////// КНОПКА ЗАКРЫТЬ //////////////////////////////
	let buttonClose = new PIXI.Sprite(WIN_btn_close_norm);
	buttonClose.x = 635;
	buttonClose.y = 62;
	buttonClose.interactive = true;
	buttonClose.on('pointerover', onbuttonCloseOver);
	buttonClose.on('pointerout', onButtonCloseOut);
	app.stage.addChild(buttonClose);
	function onbuttonCloseOver() {
		this.texture = WIN_btn_close_over;
	}
	function onButtonCloseOut() {
		this.texture = WIN_btn_close_norm;
	}

	////////// ПОЛЯ ДРУЗЕЙ //////////////////////////////
	let friendBoards = [];
	const friendBoardPositions = [
		150, 250,
		150, 318,
		150, 386,
		150, 454,
		400, 250,
		400, 318,
		400, 386,
		400, 454
	];
	for (let i = 0; i < 8; i++) {
		let friendBoard = new PIXI.Sprite(friend_board);
		friendBoard.x = friendBoardPositions[i * 2];
		friendBoard.y = friendBoardPositions[i * 2 + 1];
		app.stage.addChild(friendBoard);
		friendBoards.push(friendBoard);
	}

	////////// ЧЕКБОКСЫ ДРУЗЕЙ //////////////////////////////
	let friendCheckboxes = [];
	let friendChecks = [];
	for (let i = 0; i < 8; i++) {
		let friendCheckbox = new PIXI.Sprite(checkbox_norm);
		let friendCheck = new PIXI.Sprite(chek);
		friendCheckbox.x = friendBoards[i].x + 163;
		friendCheckbox.y = friendBoards[i].y + 5;
		friendCheck.x = friendCheckbox.x + 5;
		friendCheck.y = friendCheckbox.y + 3;
		friendCheck.visible = false;
		friendCheckbox.interactive = true;
		friendCheckbox.on('pointerover', onFriendCheckboxOver);
		friendCheckbox.on('pointerout', onFriendCheckboxOut);
		friendCheckbox.on('pointerdown', onFriendCheckboxDown);
		app.stage.addChild(friendCheckbox);
		app.stage.addChild(friendCheck);
		friendCheckboxes.push(friendCheckbox);
		friendChecks.push(friendCheck);
	}
	function onFriendCheckboxOver() {
		this.texture = checkbox_over;
	}
	function onFriendCheckboxOut() {
		this.texture = checkbox_norm;
	}
	function onFriendCheckboxDown() {
		let i = friendCheckboxes.indexOf(this);
		friendChecked[showFriendsPosition + i] = ~friendChecked[showFriendsPosition + i];
		drawChecks();
	}

	////////// ИМЕНА ДРУЗЕЙ //////////////////////////////
	for (let i = 0; i < 8; i++) {
		let friendName = new PIXI.Text('', textStyle4);
		friendName.x = friendBoards[i].x + 50;
		friendName.y = friendBoards[i].y + 12;
		//friendName.width = 200;
		app.stage.addChild(friendName);
		friendNames.push(friendName);
	}

	////////// РАМКИ ПОД АВЫ ДРУЗЕЙ //////////////////////////////
	for (let i = 0; i < 8; i++) {
		let friendFrame = new PIXI.Sprite(friend_frame);
		friendFrame.x = friendBoards[i].x;
		friendFrame.y = friendBoards[i].y;
		app.stage.addChild(friendFrame);
	}

	////////// АВЫ ДРУЗЕЙ //////////////////////////////
	for (let i = 0; i < 8; i++) {
		let friendPhoto = new PIXI.Sprite();
		friendPhoto.x = friendBoards[i].x + 4;
		friendPhoto.y = friendBoards[i].y + 4;
		friendPhoto.width = 36;
		friendPhoto.height = 36;
		app.stage.addChild(friendPhoto);
		friendPhotos.push(friendPhoto);
	}

	////////// РАМКИ НАД АВАМИ ДРУЗЕЙ //////////////////////////////
	let friendFrames = [];
	for (let i = 0; i < 8; i++) {
		let friendFrame = new PIXI.Sprite(friend_frame_empty);
		friendFrame.x = friendBoards[i].x;
		friendFrame.y = friendBoards[i].y;
		friendFrame.interactive = true;
		friendFrame.buttonMode = true;
		friendFrame.on('pointerdown', onFriendFrameDown);
		app.stage.addChild(friendFrame);
		friendFrames.push(friendFrame);
	}
	function onFriendFrameDown() {
		let i = friendFrames.indexOf(this);
		if (selectFirstTab) {
			VK.callMethod("showRequestBox", onlineFriendsID[showFriendsPosition + i], "Приглашаю Вас в приложение!", "myRequestKey");
		} else {
			VK.api("wall.post", {"owner_id": offlineFriendsID[showFriendsPosition + i], "attachments": "photo-64219465_456239129", "v":"5.73"}, function (data) {
			});
		}
	}

	////////// КНОПКА СТРЕЛКА ВЛЕВО //////////////////////////////
	let buttonArrowLeft = new PIXI.Sprite(WIN_btn_arrow_norm);
	buttonArrowLeft.x = 120;
	buttonArrowLeft.y = 370;
	buttonArrowLeft.anchor.set(0.5);
	buttonArrowLeft.rotation = Math.PI * 1.5;
	buttonArrowLeft.interactive = true;
	buttonArrowLeft.on('pointerover', onButtonArrowLeftOver);
	buttonArrowLeft.on('pointerout', onButtonArrowLeftOut);
	buttonArrowLeft.on('pointerdown', onButtonArrowLeftDown);
	app.stage.addChild(buttonArrowLeft);
	function onButtonArrowLeftOver() {
		this.texture = WIN_btn_arrow_over;
	}
	function onButtonArrowLeftOut() {
		this.texture = WIN_btn_arrow_norm;
	}
	function onButtonArrowLeftDown() {
		if (showFriendsPosition > 8) showFriendsPosition -= 8;
		else showFriendsPosition = 0;
		drawFriends();
		drawChecks();
	}

	////////// КНОПКА СТРЕЛКА ВПРАВО //////////////////////////////
	let buttonArrowRight = new PIXI.Sprite(WIN_btn_arrow_norm);
	buttonArrowRight.x = 630;
	buttonArrowRight.y = 370;
	buttonArrowRight.anchor.set(0.5);
	buttonArrowRight.rotation = Math.PI * 0.5;
	buttonArrowRight.interactive = true;
	buttonArrowRight.on('pointerover', onButtonArrowRightOver);
	buttonArrowRight.on('pointerout', onButtonArrowRightOut);
	buttonArrowRight.on('pointerdown', onButtonArrowRightDown);
	app.stage.addChild(buttonArrowRight);
	function onButtonArrowRightOver() {
		this.texture = WIN_btn_arrow_over;
	}
	function onButtonArrowRightOut() {
		this.texture = WIN_btn_arrow_norm;
	}
	function onButtonArrowRightDown() {
		if (selectFirstTab) {
			if (showFriendsPosition < onlineFriendsNames.length - 16) showFriendsPosition += 8;
			else showFriendsPosition = onlineFriendsNames.length - 8;
		} else {
			if (showFriendsPosition < offlineFriendsNames.length - 16) showFriendsPosition += 8;
			else showFriendsPosition = offlineFriendsNames.length - 8;
		}
		drawFriends();
		drawChecks();
	}

	////////// ТЕКСТОВЫЕ НАДПИСИ //////////////////////////////
	let titleText = new PIXI.Text('Выберите\nдрузей', textStyle1);
	titleText.x = 298;
	titleText.y = 28;
	app.stage.addChild(titleText);
	let sendText = new PIXI.Text('Отправить', textStyle2);
	sendText.x = 317;
	sendText.y = 530;
	app.stage.addChild(sendText);
	let labelText = new PIXI.Text('Выберите друзей, у которых хотите\nпопросить жизнь', textStyle3);
	labelText.x = 170;
	labelText.y = 105;
	app.stage.addChild(labelText);
	let tab1Text = new PIXI.Text('Друзья онлайн', textStyle4);
	tab1Text.x = 145;
	tab1Text.y = 180;
	app.stage.addChild(tab1Text);
	let tab2Text = new PIXI.Text('Остальные друзья', textStyle4);
	tab2Text.x = 342;
	tab2Text.y = 180;
	app.stage.addChild(tab2Text);

	////////// НАЧАЛЬНЫЙ ЗАПРОС ДРУЗЕЙ ВК //////////////////////////////
	VK.api("friends.search", {count: 1000, fields: 'photo_50, online'}, function (data) {
		getFriendsInfo(data.response);
	});

	////////// ФОРМИРОВАНИЕ ДАННЫХ О ДРУЗЬЯХ //////////////////////////////
	function getFriendsInfo(friends){
		onlineFriendsNames = [];
		onlineFriendsPhotos = [];
		onlineFriendsID = [];
		offlineFriendsNames = [];
		offlineFriendsPhotos = [];
		offlineFriendsID = [];
		for (let i = 0; i < friends.items.length; i++) {
			let f = friends.items[i];
			if (f.online) {
				onlineFriendsNames.push(f.first_name);
				onlineFriendsPhotos.push(f.photo_50);
				onlineFriendsID.push(f.id);
			} else {
				offlineFriendsNames.push(f.first_name);
				offlineFriendsPhotos.push(f.photo_50);
				offlineFriendsID.push(f.id);
			}
		}
		friendChecked = [];
		friendChecked.length = offlineFriendsNames.length;
		drawFriends();
	}

	////////// ОТРИСОВКА АВАТАРОВ И ИМЕН ДРУЗЕЙ //////////////////////////////
	function drawFriends() {
		if (onlineFriendsNames.length >= 8) {
			for (let i = 0; i < 8; i++) {
				if (selectFirstTab) {
					friendPhotos[i].texture = PIXI.Texture.from(onlineFriendsPhotos[showFriendsPosition + i]);
					friendNames[i].text = onlineFriendsNames[showFriendsPosition + i];
				} else {
					friendPhotos[i].texture = PIXI.Texture.from(offlineFriendsPhotos[showFriendsPosition + i]);
					friendNames[i].text = offlineFriendsNames[showFriendsPosition + i];
				}
			}
		} else {
			for (i = 0; i < onlineFriendsNames.length; i++) {
				if (selectFirstTab) {
					friendPhotos[i].texture = PIXI.Texture.from(onlineFriendsPhotos[showFriendsPosition + i]);
					friendNames[i].text = onlineFriendsNames[showFriendsPosition + i];
				} else {
					friendPhotos[i].texture = PIXI.Texture.from(offlineFriendsPhotos[showFriendsPosition + i]);
					friendNames[i].text = offlineFriendsNames[showFriendsPosition + i];
				}
			}
		}
		showArrows();
	}

	////////// ОТРИСОВКА ГАЛОК ЧЕКБОКСОВ //////////////////////////////
	function drawChecks() {
		for (let i = 0; i < 8; i++) friendChecks[i].visible = friendChecked[showFriendsPosition + i];
	}

	////////// ПОКАЗ СТРЕЛОК //////////////////////////////
	function showArrows() {
		buttonArrowLeft.visible = !(showFriendsPosition == 0);
		if (selectFirstTab) {
			if (showFriendsPosition >= onlineFriendsNames.length - 8) buttonArrowRight.visible = false;
			else buttonArrowRight.visible = true;
		} else {
			if (showFriendsPosition >= offlineFriendsNames.length - 8) buttonArrowRight.visible = false;
			else buttonArrowRight.visible = true;
		}
	}
}
