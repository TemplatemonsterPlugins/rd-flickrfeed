<h2 class="item1">Настройки скрипта</h2>

<h5>
    Скрипт поддерживает следующие опции для настройки
</h5>

<h3>
    Общие настройки
</h3>

<p>
    Общие настройки скрипта определяются в объекте options при инициализации.
</p>

<h4>qstrings</h4>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Object</dd>
</dl>

<p>
    Составной обьект для формирования запроса. Состоит из 6-х вложенных опций:
</p>

<div class="inner">
    <h6>ids</h6>
    <dl class="inline-term">
        <dt>Тип</dt>
        <dd>String</dd>
    </dl>

    <p>
        Идентификатор пользователя. Может содержать несколько значений, разделенных запятой.
    </p>
    <h6>tags</h6>
    <dl class="inline-term">
        <dt>Тип</dt>
        <dd>String</dd>
    </dl>

    <p>
        Теги для фильтрации данных. Может содержать несколько значений, разделенных запятой.
    </p>
    <h6>tagmode</h6>
    <dl class="inline-term">
        <dt>Тип</dt>
        <dd>String</dd>
    </dl>
    <dl class="inline-term">
        <dt>Значения</dt>
        <dd>all, any</dd>
    </dl>

    <p>
        Определяет должен ли элемент соответсвовать всем указанным тегам(tagmode="all") или любому из них(tagmode="any").
    </p>

    <h6>lang</h6>
    <dl class="inline-term">
        <dt>Тип</dt>
        <dd>String</dd>
    </dl>
    <dl class="inline-term">
        <dt>Значения</dt>
        <dd>en-us, de-de, es-us, fr-fr, it-it, ko-kr, pt-br, zh-hk</dd>
    </dl>

    <p>
        Определяет язык. Значение по-умолчанию: en-us(английский).
    </p>
</div>

<h4>callback</h4>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>function</dd>
</dl>
<dl class="inline-term">
    <dt>Значение по-умолчанию</dt>
    <dd>false</dd>
</dl>

<p>
    Функция, которая будет выполнена после работы скрипта.
</p>


<h3>
    Настройки с помощью data аттрибутов
    </h3>

<p>
    Скрипт также поддерживает дополнительную настройку в HTML разметке с помощью data-атрибут API.
</p>

<h5>data-flickr-id</h5>
    <dl class="inline-term">
        <dt>Тип</dt>
        <dd>String</dd>
    </dl>

    <p>
        Идентификатор пользователя. Может содержать несколько значений, разделенных запятой.
    </p>

<h5>data-flickr-tags</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>String</dd>
</dl>

<p>
    Теги для фильтрации данных. Может содержать несколько значений, разделенных запятой.
</p>

<h5>data-flickr-tagmode</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>String</dd>
</dl>
<dl class="inline-term">
    <dt>Значения</dt>
    <dd>all, any</dd>
</dl>

<p>
    Определяет должен ли элемент соответсвовать всем указанным тегам(tagmode="all") или любому из них(tagmode="any").
</p>
<h5>data-flickr-lang</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>String</dd>
</dl>
<dl class="inline-term">
    <dt>Значения</dt>
    <dd>en-us, de-de, es-us, fr-fr, it-it, ko-kr, pt-br, zh-hk</dd>
</dl>

<p>
    Определяет язык. Значение по-умолчанию: en-us(английский).
</p>

