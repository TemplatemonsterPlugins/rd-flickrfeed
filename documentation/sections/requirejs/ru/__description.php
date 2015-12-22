<h2 class="item1">Интеграция с Require.js</h2>

<h5>
    Скрипт имеет встроенную поддержку AMD экспорта для интеграции с Require.js. Весь процесс интеграции все также
    сводится к нескольким простым шагам.
</h5>

<h3>
    Скачайте скрипт из Git'a
</h3>

<p>
    Для начала необходимо скачать данный скрипт из нашего публичного репозитория:
    <a href="http://products.git.devoffice.com/coding-development/rd-flickr-gallery.git">Кликабельно</a>
</p>


<h3>
    Добавьте необходимую разметку
</h3>

<p>
    HTML разметка по умолчанию для получения данных c сервиса выглядит следующим образом.
</p>

<code>
<pre>
&lt;!-- RD Flickr --&gt;
&lt;div class="flickr" data-flickr-id="47302490@N05"&gt;
  &lt;div data-type="flickr-item"&gt;&lt;
    &lt;img data-image_q="src" data-title="alt" src="images/_blank.png" alt=""/&gt;
    ...
  &lt;/div&gt;
&lt;/div&gt;
&lt;!-- END RD Flickr--&gt;
</pre>
</code>

<p>
    <strong>Обратите внимание:</strong>
    разметка внутри данного блока может быть произвольной, включая элементы сетки и т.д. Необходимо только наличие
    элемента с атрибутом data-type="flickr-item".
</p>


<h3>
    HTML разметка элемента
</h3>

<p>
    Получить данные элемента возможно только внутри блока с атрибутом data-type="flickr-item". Для получения данных необходимо
    дописать следующий атрибут: <br/>
<div style="text-align:center;">data-(название данных)="target"</div> <br/>
где target - атрибут, в который будут записаны данные. Если в target указать значение “text”, данные будут выведены
внутрь тега обычным текстом. В target можно записать несколько значений, определив их через запятую. Например для
вывода картинки и даты добавления фото необходима следующая разметка:
</p>

<code>
<pre>
&lt;div data-type="flickr-item"&gt;
    &lt;img src="images/_blank.png" data-image_z="src" data-title="alt" alt=""/&gt;
    &lt;time data-dating="text" data-datetime="datetime"&gt;&lt;/time&gt;
    ...
&lt;/div&gt;
</pre>
</code>

<h4>Список возможных атрибутов:</h4>
<ul class="marked-list">
    <li>
        <dl class="inline-term">
            <dt>data-description</dt>
            <dd>описание фото</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-title</dt>
            <dd>заголовок фото</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-tags</dt>
            <dd>теги</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-author</dt>
            <dd>Автор (с e-mail)</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-author_name</dt>
            <dd>Автор фото (без e-mail)</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-link</dt>
            <dd>ссылка на фото</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-dating</dt>
            <dd>дата публикации в указанном формате</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-datetime</dt>
            <dd>дата публикации в формате YY-MM-DD</dd>
        </dl>
    </li>
</ul>

<p>
    <strong>Обратите внимание:</strong>
    описание элемента не всегда доступно в сервисе flickr
</p>


<h3>
    HTML разметка картинки элемента
</h3>

<p>
    Для получения ссылки на картинку сервиса необходимо указать аттрибут data-image_(суффикс картинки)=”src”
</p>

<h4>Список возможных суффиксов:</h4>
<ul class="marked-list">
    <li>
        <dl class="inline-term">
            <dt>s</dt>
            <dd>75x75px</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>s</dt>
            <dd>150x150px</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>t</dt>
            <dd>100px по большей стороне</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>m</dt>
            <dd>240px по большей стороне</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>n</dt>
            <dd>320px по большей стороне</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>-</dt>
            <dd>500px по большей стороне</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>z</dt>
            <dd>640px по большей стороне</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>c</dt>
            <dd>800px по большей стороне</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>b</dt>
            <dd>1024px по большей стороне</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>h</dt>
            <dd>1600px по большей стороне</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>k</dt>
            <dd>2048px по большей стороне</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>o</dt>
            <dd>оригинальный размер</dd>
        </dl>
    </li>
</ul>

<p>
    <strong>Обратите внимание:</strong>
    некоторые размеры картинок не всегда доступно в сервисе flickr.
</p>

<h3>
    Обновите конфигурацию require.js
</h3>

<p>
    Прежде всего вам нобходимо убедиться в правильности настройки конфигурации путей в require.js. Обязательно необходимо
    определить алиасы jquery и jquery.rd-parallax. В большинстве случаев, данная конфигурация определяется в главном скрипте
    приложения, путь к которому определяется в дата атрибуте data-main при подключении require.js
</p>

<code>
<pre>
&lt;script data-main="js/main" src="js/require.js"&gt;&lt;/script&gt;
</pre>
</code>

<p>
    Сама конфигурация должна содержать следующие алиасы для путей
</p>

<code>
<pre>
requirejs.config({
  paths: {
    "jquery": "path/to/jquery"
    "jquery.rd-flickr-gallery": "path/to/jquery.rd-flickr-gallery"
  }
});
</pre>
</code>

<h3>
    Выполните инициализацию скрипта
</h3>

<p>
    Для инициализации скрипта достаточно воспользоваться следующим кодом.
</p>

<code>
<pre>
requirejs(["jquery", "jquery.rd-flickr-gallery"], function($, flickr) {
  var o = $(".rd-flickr");
  o.RDFlickr();
});
</pre>
</code>

