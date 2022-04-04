
import { parseChat } from './parseChat';

test('Parse Chat Step 1 (single sentence)', () => {
    const inputString = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const outputData = [{
        date: '14:24:32',
        mention: '14:24:32 Customer : ',
        sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'customer'
    }];
    expect(parseChat(inputString)).toStrictEqual(outputData);
});

test('Parse Chat Step 2 (two sentences)', () => {
    const inputString = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.`;
    const outputData = [{
        date: '14:24:32',
        mention: '14:24:32 Customer : ',
        sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
        type: 'customer'
    }, {
        date: '14:26:15',
        mention: '14:26:15 Agent : ',
        sentence: 'Aliquam non cursus erat, ut blandit lectus.',
        type: 'agent'
    }];
    expect(parseChat(inputString)).toStrictEqual(outputData);
});

test('Parse Chat Step 3 (two customer mentions as start)', () => {
    const inputString = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.
14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.
14:28:28 Customer : Contrary to popular belief, Lorem Ipsum is not simply random text.`;
    const outputData = [{
        date: '14:24:32',
        mention: '14:24:32 Customer : ',
        sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
        type: 'customer'
    }, {
        date: '14:27:00',
        mention: '14:27:00 Customer : ',
        sentence: 'Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n',
        type: 'customer'
    }, {
        date: '14:27:47',
        mention: '14:27:47 Agent : ',
        sentence: 'Vestibulum tempor diam eu leo molestie eleifend.\n',
        type: 'agent'
    }, {
        date: '14:28:28',
        mention: '14:28:28 Customer : ',
        sentence: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
        type: 'customer'
    }];
    expect(parseChat(inputString)).toStrictEqual(outputData);
});

test('Parse Chat Step 4 (date splitting)', () => {
    const inputString = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.';
    const outputData = [{
        date: '14:24:32',
        mention: '14:24:32 Customer : ',
        sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'customer'
    }, {
        date: '14:26:15',
        mention: '14:26:15 Agent : ',
        sentence: 'Aliquam non cursus erat, ut blandit lectus.',
        type: 'agent'
    }];
    expect(parseChat(inputString)).toStrictEqual(outputData);
});

test('Parse Chat Step 5 (ignore extra dates)', () => {
    const inputString = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus.';
    const outputData = [{
        date: '14:24:32',
        mention: '14:24:32 Customer : ',
        sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'customer'
    }, {
        date: '14:26:15',
        mention: '14:26:15 Agent : ',
        sentence: 'I received it at 12:24:48, ut blandit lectus.',
        type: 'agent'
    }];
    expect(parseChat(inputString)).toStrictEqual(outputData);
});

test('Parse Chat Step 6 (full name)', () => {
    const inputString = '14:24:32 Luca Galasso : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Emanuele Querzola : I received the package, ut blandit lectus.';
    const outputData = [{
        date: '14:24:32',
        mention: '14:24:32 Luca Galasso : ',
        sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'customer'
    }, {
        date: '14:26:15',
        mention: '14:26:15 Emanuele Querzola : ',
        sentence: 'I received the package, ut blandit lectus.',
        type: 'agent'
    }];
    expect(parseChat(inputString)).toStrictEqual(outputData);
});

test('Parse Chat Step 7 [Extra] (missing colon after the names)', () => {
    const inputString = '14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent I received it at 12:24:48, ut blandit lectus.';
    const outputData = [{
        date: '14:24:32',
        mention: '14:24:32 Customer ',
        sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'customer'
    }, {
        date: '14:26:15',
        mention: '14:26:15 Agent ',
        sentence: 'I received it at 12:24:48, ut blandit lectus.',
        type: 'agent'
    }];
    expect(parseChat(inputString)).toStrictEqual(outputData);
});
