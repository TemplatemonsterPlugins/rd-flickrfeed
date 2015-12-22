<h2 class="item1">Options</h2>

<h5>
    There are several options available in the script:
</h5>

<h3>
    General Options
</h3>

<p>
    You can define the options below in script initialization
</p>

<h4>qstrings</h4>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>Object</dd>
</dl>

<p>
    Composite object to define query. It consists 6 nested options:
</p>
<div class="inner">
    <h6>ids</h6>
    <dl class="inline-term">
        <dt>Type</dt>
        <dd>String</dd>
    </dl>

    <p>
        A comma delimited list of user IDs. This specifies a list of users to fetch for.
    </p>
    <h6>tags</h6>
    <dl class="inline-term">
        <dt>Type</dt>
        <dd>String</dd>
    </dl>

    <p>
        A comma delimited list of tags to filter the feed by.
    </p>
    <h6>tagmode</h6>
    <dl class="inline-term">
        <dt>Type</dt>
        <dd>String</dd>
    </dl>
    <dl class="inline-term">
        <dt>values:</dt>
        <dd>all, any</dd>
    </dl>

    <p>
        Control whether items must have ALL the tags (tagmode=all), or ANY (tagmode=any) of the tags.
    </p>

    <h6>lang</h6>
    <dl class="inline-term">
        <dt>Type</dt>
        <dd>String</dd>
    </dl>
    <dl class="inline-term">
        <dt>Values:</dt>
        <dd>en-us, de-de, es-us, fr-fr, it-it, ko-kr, pt-br, zh-hk</dd>
    </dl>

    <p>
        The display language for the feed. Default is US English (en-us).
    </p>
</div>

<h4>callback</h4>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>function</dd>
</dl>
<dl class="inline-term">
    <dt>Default value</dt>
    <dd>false</dd>
</dl>

<p>
    Function, which be called after the script working
</p>





<h3>
    Customize with data attributes
</h3>

<p>
    Script supports a data API for customization in HTML
</p>

<h5>data-flickr-id</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>String</dd>
</dl>

<p>
    A comma delimited list of user IDs. This specifies a list of users to fetch for.
</p>

<h5>data-flickr-tags</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>String</dd>
</dl>

<p>
    A comma delimited list of tags to filter the feed by.
</p>

<h5>data-flickr-tagmode</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>String</dd>
</dl>
<dl class="inline-term">
    <dt>Values:</dt>
    <dd>all, any</dd>
</dl>

<p>
    Control whether items must have ALL the tags (tagmode=all), or ANY (tagmode=any) of the tags.
</p>
<h5>data-flickr-lang</h5>
<dl class="inline-term">
    <dt>Type</dt>
    <dd>String</dd>
</dl>
<dl class="inline-term">
    <dt>Values:</dt>
    <dd>en-us, de-de, es-us, fr-fr, it-it, ko-kr, pt-br, zh-hk</dd>
</dl>

<p>
    The display language for the feed. Default is US English (en-us).
</p>

